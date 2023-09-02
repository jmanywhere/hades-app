import { formatEther, parseEther } from "viem";

const StatContainer = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row md:max-w-lg lg:max-w-screen flex-wrap items-center justify-center gap-4 pt-5">
        <Stat name="nfv" value={parseEther("1500.1111")} />
        <Stat name="gfv" value={parseEther("35800.2222")} />
        <Stat name="claimable" value={parseEther("823456.8888")} />
        <Stat name="pending" value={parseEther("55.56")} />
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
          {parseFloat(
            parseFloat(formatEther(props.value)).toFixed(2)
          ).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default StatContainer;
