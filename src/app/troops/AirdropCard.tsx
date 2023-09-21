"use client";
// Imports
import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { BaseError, formatEther, isAddress, parseEther } from "viem";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// Web3 Local Imports
import { fountain } from "@/abi/contracts";
import fountainAbi from "@/abi/FountainABI";
// Global Data
import { balanceAtom, userAtom } from "@/atoms/fountain";
// Utils
import { fromBigIntToReadable } from "@/utils/bigintUtils";

const AirdropCard = () => {
  const chain = useNetwork();
  const [airdropAmount, setAirdropAmount] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [selectPending, setSelectPending] = useState(false);
  const balanceData = useAtomValue(balanceAtom);
  const userData = useAtomValue(userAtom);

  const enabledWrite = isAddress(receiverAddress) && airdropAmount > 0;

  const { config, error: airdropError } = usePrepareContractWrite({
    address: fountain,
    abi: fountainAbi,
    functionName: "airdrop",
    args: [
      isAddress(receiverAddress) ? receiverAddress : "0x00000000dead",
      parseEther(airdropAmount.toString()),
      selectPending,
    ],
    enabled: enabledWrite,
  });
  const {
    write: airdrop,
    data: airdropData,
    error: airdropTxError,
  } = useContractWrite(config);
  const { isLoading: airdropLoading, data: airdropTxData } =
    useWaitForTransaction({
      hash: airdropData?.hash,
    });

  const fullError = useMemo(() => {
    if (!airdropError) return "";
    if (airdropError.message.includes("reverted with the following reason:"))
      return airdropError.message
        .split("reverted with the following reason:")[1]
        .split("Contract Call")[0]
        .trim();
    const main = (airdropError as BaseError)?.metaMessages?.[0]
      .split("(")
      .join("\n(");
    const sub = (airdropError as BaseError)?.metaMessages?.[1];
    return `${main}\n${sub?.trim()}`;
  }, [airdropError]);

  console.log({ airdropError });

  return (
    <div className="hot-bg card flex max-w-md">
      <div className="flex-grow m-[1px] bg-base-100 card py-6 px-4 md:px-8">
        <div className="font-dalek text-center uppercase text-lg pb-3">
          - Airdrop -
        </div>
        <div className="form-control font-gideon_roman pb-4">
          <label className="label">
            <span className="label-text-alt">User To Airdrop</span>
          </label>
          <input
            className={classNames(
              "join-item input w-full text-md",
              !isAddress(receiverAddress) && receiverAddress.length > 0
                ? "input-error"
                : "input-secondary"
            )}
            placeholder="0x00...000"
            type="text"
            value={receiverAddress}
            onChange={(e) => {
              setReceiverAddress(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div className="form-control font-gideon_roman">
          <label className="label">
            <span className="label-text-alt">HADES to Airdrop</span>
          </label>
          <div className="join border-secondary/50 border-[1px]">
            <input
              className="join-item input w-full text-xl text-right"
              placeholder="0.0"
              type="number"
              value={airdropAmount == 0 ? "" : airdropAmount.toString()}
              onChange={(e) => {
                if (isNaN(e.target.valueAsNumber)) setAirdropAmount(0);
                else setAirdropAmount(e.target.valueAsNumber);
              }}
              onFocus={(e) => e.target.select()}
            />
            <button
              className="join-item btn btn-link no-underline bg-transparent"
              onClick={() =>
                selectPending
                  ? setAirdropAmount(
                      parseFloat(formatEther(userData.pendingAirdrops))
                    )
                  : setAirdropAmount(
                      parseFloat(formatEther(balanceData.hadesBalance))
                    )
              }
            >
              MAX
            </button>
          </div>
        </div>
        <div className="font-gideon_roman text-sm py-2">
          <div className="form-control">
            <label className="label cursor-pointer justify-center gap-x-4">
              <div
                className={classNames(
                  "label-text whitespace-pre text-center",
                  !selectPending ? "hot-text" : "text-white/70"
                )}
              >
                Wallet{"\n"}
                {fromBigIntToReadable(balanceData.hadesBalance)}
              </div>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                checked={selectPending}
                onChange={(e) => setSelectPending(e.target.checked)}
              />
              <div
                className={classNames(
                  "label-text whitespace-pre text-center",
                  selectPending ? "cool-text" : "text-white/70"
                )}
              >
                Holding{"\n"}
                {fromBigIntToReadable(userData.pendingAirdrops)}
              </div>
            </label>
          </div>
        </div>
        <div className="text-center pt-4 pb-2">
          <button
            className="enabled:hot-btn btn disabled:bg-slate-400/20 btn-sm w-[180px] font-gideon_roman"
            disabled={!enabledWrite || !!airdropError || airdropLoading}
            aria-disabled={!enabledWrite || !!airdropError || airdropLoading}
            onClick={() => airdrop?.()}
          >
            {airdropLoading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Airdrop"
            )}
          </button>
          <p className="text-error font-gideon_roman text-sm pt-2 whitespace-pre-wrap">
            {fullError}
          </p>
          {airdropData?.hash && (
            <a
              className={classNames(
                "font-gideon_roman text-sm pt-2 break-words",
                airdropLoading
                  ? "text-white/70"
                  : airdropTxData?.status == "success"
                  ? "text-green-400"
                  : "text-error"
              )}
              href={`${chain?.chain?.blockExplorers?.default.url}/tx/${airdropData?.hash}`}
              target="_blank"
            >
              {chain?.chain?.blockExplorers?.default.url}/tx/{airdropData?.hash}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirdropCard;
