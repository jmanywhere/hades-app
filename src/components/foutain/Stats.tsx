"use client";
import { userAtom } from "@/atoms/fountain";
import { useAtomValue } from "jotai";
import { formatEther } from "viem";

const StatContainer = () => {
  const userData = useAtomValue(userAtom);
  return (
    <section className="flex flex-col items-center justify-center py-10">
      <div className="flex flex-col md:flex-row md:max-w-lg lg:max-w-screen flex-wrap items-center justify-center gap-4 pt-5 z-10">
        <Stat name="nfv" value={userData.nfv} />
        <Stat name="gfv" value={userData.gfv} />
        <Stat
          name="claimable"
          value={userData.faucetPayout + userData.rebasePayout}
        />
        <Stat name="pending" value={userData.maxPayout} />
      </div>
    </section>
  );
};

const Stat = (props: { name: string; value: bigint }) => {
  return (
    <div className="flex hot-bg overflow-hidden rounded-3xl font-gideon_roman w-[220px]">
      <div className="flex-grow px-8 py-4 m-[1px] bg-base-100 rounded-3xl">
        <div className="text-center uppercase text-lg pb-3">
          - {props.name} -
        </div>
        <div className="text-center hot-text text-2xl font-sans">
          {parseFloat(formatEther(props.value)).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default StatContainer;
