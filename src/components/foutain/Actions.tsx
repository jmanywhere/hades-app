"use client";
const Actions = () => {
  return (
    <div className="flex flex-col flex-grow font-gideon_roman">
      <div className="flex flex-row  uppercase items-center gap-4 pb-4">
        <h5 className="text-base">
          Current Hades Bonus:{" "}
          <span className="text-secondary text-3xl">0.5%</span>
        </h5>
        <button
          className="enabled:hot-btn btn btn-sm disabled:bg-slate-400/20"
          disabled
        >
          Boost
        </button>
      </div>
      <div className="join font-gideon_roman border-secondary/50 border-[1px]">
        <input className="join-item input w-full text-3xl" />
        <button className="join-item btn btn-link no-underline bg-transparent">
          MAX
        </button>
        <button className="join-item enabled:hot-btn btn disabled:bg-slate-400/20">
          Deposit
        </button>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 pt-5">
        <button className="enabled:hot-btn btn disabled:bg-slate-400/20 btn-sm w-[180px]">
          Claim
        </button>
        <button className="enabled:hot-btn btn disabled:bg-slate-400/20 btn-sm w-[180px]">
          Compound
        </button>
      </div>
    </div>
  );
};

export default Actions;
