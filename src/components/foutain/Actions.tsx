"use client";

import { fountain, hades } from "@/abi/contracts";
import testHadesAbi from "@/abi/TESTHadesABI";
import fountainAbi from "@/abi/FountainABI";
import { balanceAtom, userAtom } from "@/atoms/fountain";
import { useDebounce } from "@/hooks/useDebounce";
import classNames from "classnames";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { formatEther, maxUint256, parseEther } from "viem";
import {
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { fromBigIntToReadable } from "@/utils/bigintUtils";

const Actions = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const balanceData = useAtomValue(balanceAtom);
  const userData = useAtomValue(userAtom);
  const debouncedDepositAmount = useDebounce(depositAmount);

  const { config: depositConfig, error: depositErr } = usePrepareContractWrite({
    address: fountain,
    abi: fountainAbi,
    functionName: "deposit",
    args: [
      parseEther(debouncedDepositAmount.toString()),
      "0x7Ff20b4E1Ad27C5266a929FC87b00F5cCB456374",
    ],
  });
  const { config: claimConfig, error: claimErr } = usePrepareContractWrite({
    address: fountain,
    abi: fountainAbi,
    functionName: "claim",
  });
  const { config: compoundConfig, error: compoundErr } =
    usePrepareContractWrite({
      address: fountain,
      abi: fountainAbi,
      functionName: "compoundAll",
    });
  const { config: approveConfig, error: approveError } =
    usePrepareContractWrite({
      address: hades,
      abi: erc20ABI,
      functionName: "approve",
      args: [fountain, maxUint256],
    });

  const { write: depositWrite, data: depositData } =
    useContractWrite(depositConfig);
  const { write: approveWrite, data: approveData } =
    useContractWrite(approveConfig);
  const { write: claimWrite, data: claimData } = useContractWrite(claimConfig);
  const { write: compoundWrite, data: compoundData } =
    useContractWrite(compoundConfig);
  const { write: mintTestHades } = useContractWrite({
    address: hades,
    abi: testHadesAbi,
    functionName: "mint",
  });

  const { isLoading: isDepositing } = useWaitForTransaction({
    hash: depositData?.hash,
    confirmations: 7,
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
    confirmations: 7,
  });
  const { isLoading: isClaiming } = useWaitForTransaction({
    hash: claimData?.hash,
    confirmations: 7,
  });
  const { isLoading: isCompounding } = useWaitForTransaction({
    hash: compoundData?.hash,
    confirmations: 7,
  });

  const isNOTAllowed = balanceData.hadesFountainAllowance == 0n;

  console.log({ depositErr, approveError });

  const rebaseBonus = useMemo(() => {
    if (userData.hadesPercent <= 25_0000n) return 0;
    if (userData.hadesPercent <= 50_0000n)
      return (
        (parseInt((userData.hadesPercent - 25_0000n).toString()) * 0.5) /
        25_0000
      );
    return 0.5;
  }, [userData.hadesPercent]);

  return (
    <div className="flex flex-col flex-grow font-gideon_roman ">
      {balanceData.hadesBalance === 0n && (
        <div>
          <button className="btn btn-primary" onClick={() => mintTestHades?.()}>
            Get test Hades
          </button>
        </div>
      )}
      <div className="flex flex-row justify-center uppercase items-center gap-4 pb-4">
        <h5 className="text-base">
          Current Daily Hades Bonus:{" "}
          <span className="text-secondary text-3xl">
            {(rebaseBonus + 1).toString()}%
          </span>
        </h5>
        <button
          className="enabled:hot-btn btn btn-sm disabled:bg-slate-400/20"
          disabled
        >
          Boost
        </button>
      </div>
      <div className="form-control font-gideon_roman">
        <div className="join border-secondary/50 border-[1px]">
          <input
            className="join-item input w-full text-3xl"
            placeholder="Deposit $HADES"
            type="number"
            value={depositAmount}
            onChange={(e) => {
              if (isNaN(e.target.valueAsNumber)) setDepositAmount(0);
              else setDepositAmount(e.target.valueAsNumber);
            }}
            onFocus={(e) => e.target.select()}
          />
          <button
            className="join-item btn btn-link no-underline bg-transparent"
            onClick={() =>
              setDepositAmount(
                parseFloat(formatEther(balanceData.hadesBalance))
              )
            }
          >
            MAX
          </button>
          <button
            className={classNames(
              "join-item btn disabled:bg-slate-400/20",
              isNOTAllowed ? "enabled:cool-btn" : "enabled:hot-btn",
              isDepositing || isApproving ? "loading loading-spinner mx-7" : ""
            )}
            onClick={() => {
              if (isNOTAllowed) approveWrite?.();
              else depositWrite?.();
            }}
            disabled={isNOTAllowed ? !!approveError : !!depositErr}
          >
            {isNOTAllowed ? "Approve" : "Deposit"}
          </button>
        </div>
        <label className="label">
          <span className="label-text-alt">
            Wallet HADES: {fromBigIntToReadable(balanceData.hadesBalance)}
          </span>
        </label>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 pt-5">
        <button
          className={classNames(
            "enabled:hot-btn btn disabled:bg-slate-400/20 btn-sm w-[180px]"
          )}
          disabled={!!claimErr || isClaiming}
          onClick={() => claimWrite?.()}
        >
          <span
            className={classNames(
              isClaiming ? "loading loading-spinner" : "hidden"
            )}
          />
          {isClaiming ? "" : "Claim"}
        </button>
        <button
          className={classNames(
            "enabled:hot-btn btn disabled:bg-slate-400/20 btn-sm w-[180px]"
          )}
          disabled={!!compoundErr || isCompounding || userData.nfv === 0n}
          onClick={() => compoundWrite?.()}
        >
          <span
            className={classNames(
              "contents",
              isCompounding ? "loading loading-spinner" : "hidden"
            )}
          />
          {isCompounding ? "" : "Compound"}
        </button>
      </div>
    </div>
  );
};

export default Actions;
