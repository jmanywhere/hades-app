import FountainActions from "@/components/foutain/Actions";
import StatContainer from "@/components/foutain/Stats";
import { type NextPage } from "next";
import Image from "next/image";

const FountainPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center w-full p-12">
      <div className="container">
        <h1 className="font-greek text-3xl cool-text text-center md:text-left">
          Your fountain
        </h1>
        <section className="flex flex-col-reverse jusitify-center md:flex-row items-center">
          <FountainActions />
          <Image
            src="/fountain.png"
            alt="fountain"
            width={339 / 1.2}
            height={283 / 1.2}
          />
        </section>
        <StatContainer />
        <section className="flex flex-col items-center justify-center pt-10">
          <h2 className="container text-secondary font-greek text-3xl">
            Your Hades
          </h2>
        </section>
      </div>
      Foundation Page
    </main>
  );
};

export default FountainPage;
