import FountainActions from "@/components/foutain/Actions";
import Gauge from "@/components/foutain/CerberusGauge";
import StatContainer from "@/components/foutain/Stats";
import { type NextPage } from "next";
import Image from "next/image";

const FountainPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center w-full p-12">
      <div className="container">
        <h1 className="font-greek text-3xl cool-text text-center ">
          Your fountain
        </h1>
        <section className="flex flex-col justify-center items-center">
          <Image
            src="/fountain.png"
            alt="fountain"
            width={339 / 1.2}
            height={283 / 1.2}
            className="pointer-events-none"
          />
          <FountainActions />
        </section>
        <StatContainer />
        <section className="flex flex-col items-center justify-center pt-10">
          <h2 className="container text-secondary font-greek text-3xl z-10 text-center">
            Your Hades
          </h2>
          <Gauge />
        </section>
      </div>
    </main>
  );
};

export default FountainPage;
