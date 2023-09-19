"use client";
import Image from "next/image";
import Cerberus from "../../../public/cerberus.png";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms/fountain";
import { useMemo } from "react";
import classNames from "classnames";
const Gauge = () => {
  const userData = useAtomValue(userAtom);
  const userRange = useMemo(() => {
    if (userData.hadesPercent > 50_000n)
      return ["bg-green-500/25", "Good", "text-green-500"];
    if (userData.hadesPercent > 25_000n)
      return ["bg-yellow-500/25", "Caution", "text-yellow-500"];
    return ["bg-red-500/25", "Critical", "text-red-500"];
  }, [userData]);
  return (
    <div className="w-full flex items-center justify-center pt-14">
      <div
        className={classNames(
          "px-8 py-4 border-[1px] border-secondary-focus rounded-xl relative",
          userRange[0]
        )}
      >
        <div
          className={classNames(
            "absolute -top-10 left-0 font-greek text-3xl",
            userRange[2]
          )}
        >
          {userRange[1]}
        </div>
        <div className="max-w-[20rem]">
          <Image src={Cerberus} alt="Cerberus Gauge" />
        </div>
      </div>
    </div>
  );
};

export default Gauge;
