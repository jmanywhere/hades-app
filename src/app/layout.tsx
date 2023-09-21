import "./globals.css";
import { Providers } from "./clientProviders";
import { Inter, Gideon_Roman } from "next/font/google";
import localFont from "next/font/local";
import classNames from "classnames";
import { Header } from "@/components/LayoutComps";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dalek = localFont({
  src: "./fonts/DalekPinpointBold.ttf",
  variable: "--font-dalek",
});
const greek = localFont({
  src: "./fonts/geek.ttf",
  variable: "--font-greek",
});
const aug = Gideon_Roman({
  subsets: ["latin"],
  variable: "--font-gideon-roman",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          aug.variable,
          inter.variable,
          dalek.variable,
          greek.variable
        )}
      >
        <Providers>
          <Header />
          <div className="relative min-h-[calc(100vh-112px-64px)] z-10">
            {children}
            <Image
              src="/bottom_bg.png"
              width={1904}
              height={640}
              alt="background bottom"
              className="absolute bottom-0 z-0 pointer-events-none"
            />
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

const Footer = () => {
  return (
    <footer className="navbar flex flex-row justify-center dark-bg">
      <nav className="flex flex-row items-center justify-center gap-4">
        <a
          href="https://medium.com"
          className="btn bg-main-bg hover:bg-white/30 border-0 btn-circle btn-sm hover:opacity-90"
          target="_blank"
          rel="noopener nonreferrer"
        >
          <Image src="/medium 1.svg" alt="medium link" width={20} height={20} />
        </a>
        <a
          href="https://telegram.com"
          className="btn bg-main-bg hover:bg-white/30 border-0 btn-circle btn-sm hover:opacity-90"
          target="_blank"
          rel="noopener nonreferrer"
        >
          <Image
            src="/telegram 1.svg"
            alt="medium link"
            width={30}
            height={30}
          />
        </a>
        <a
          href="https://x.com"
          className="btn bg-main-bg hover:bg-white/30 border-0 btn-circle btn-sm hover:opacity-90"
          target="_blank"
          rel="noopener nonreferrer"
        >
          <Image
            src="/twitter 1.svg"
            alt="medium link"
            width={25}
            height={25}
          />
        </a>
        <a
          href="https://gmail.com"
          className="btn bg-main-bg hover:bg-white/30 border-0 btn-circle btn-sm hover:opacity-90"
          target="_blank"
          rel="noopener nonreferrer"
        >
          <Image src="/email.svg" alt="medium link" width={30} height={30} />
        </a>
        <a
          href="https://gitbook.com"
          className="btn bg-main-bg hover:bg-white/30 border-0 btn-circle btn-sm hover:opacity-90 overflow-hidden"
          target="_blank"
          rel="noopener nonreferrer"
        >
          <div>
            <Image
              src="/gitbook.png"
              alt="medium link"
              width={32}
              height={32}
            />
          </div>
        </a>
      </nav>
    </footer>
  );
};
