"use client";

import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import HeadLogo from "@/../public/logo_head.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export const Header = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="navbar">
      <div className="navbar-start flex flex-row items-center">
        <Image src={HeadLogo} alt="logo" width={95} />
        <div className="font-dalek text-5xl cool-text pr-6">Hades</div>
        <nav className="navbar-center font-gideon_roman uppercase text-xl flex flex-row items-center gap-6">
          <Link
            href="/"
            className={classNames(pathname === "/" ? "hot-text" : "")}
          >
            Home
          </Link>
          <Link
            href="/"
            className={classNames(pathname === "/swap" ? "hot-text" : "")}
          >
            Swap
          </Link>
          <Link
            href="/fountain"
            className={classNames(pathname === "/fountain" ? "hot-text" : "")}
          >
            fountain
          </Link>
          <Link
            href="/"
            className={classNames(pathname === "/underworld" ? "hot-text" : "")}
          >
            underworld
          </Link>
          <Link
            href="/"
            className={classNames(pathname === "/teams" ? "hot-text" : "")}
          >
            teams
          </Link>
        </nav>
      </div>
      <div className="navbar-end">
        <Web3Button icon="hide" balance="hide" />
      </div>
    </header>
  );
};
