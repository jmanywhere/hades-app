import type { NextPage } from "next";
import AirdropCard from "./AirdropCard";

const TroopsPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center w-full py-8 px-4 sm:px-8 md:px-12">
      <div className="container">
        <h1 className="text-center text-3xl font-greek cool-text">Troops</h1>
        <section className="flex flex-col justify-center items-center">
          <AirdropCard />
        </section>
      </div>
    </main>
  );
};

export default TroopsPage;
