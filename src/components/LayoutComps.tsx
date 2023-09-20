"use client";

import { Web3Button } from "@web3modal/react";
import Image from "next/image";
import HeadLogo from "@/../public/logo_head.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { CgMenuRightAlt } from "react-icons/cg";

export const Header = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="navbar">
      <div className="navbar-start flex flex-row items-center">
        <Image
          src={HeadLogo}
          alt="logo"
          width={95}
          className="w-[80px] md:w-[95px]"
        />
        <div className="font-dalek text-5xl md:text-5xl cool-text pr-6">
          Hades
        </div>
        <nav className="hidden navbar-center font-gideon_roman uppercase text-xl lg:flex flex-row items-center gap-6">
          <Link
            href="/"
            className={classNames(
              pathname === "/" ? "hot-text" : "",
              "hover:cool-text hover:opacity-70 transition-all duration-500 "
            )}
          >
            Home
          </Link>
          <Link
            href="/"
            className={classNames(
              pathname === "/swap" ? "hot-text" : "",
              "hover:cool-text hover:opacity-70 transition-all duration-500 "
            )}
          >
            Swap
          </Link>
          <Link
            href="/fountain"
            className={classNames(
              pathname === "/fountain" ? "hot-text" : "",
              "hover:cool-text hover:opacity-70 transition-all duration-500 "
            )}
          >
            fountain
          </Link>
          <Link
            href="/"
            className={classNames(
              pathname === "/underworld" ? "hot-text" : "",
              "hover:cool-text hover:opacity-70 transition-all duration-500 "
            )}
          >
            underworld
          </Link>
          <Link
            href="/troops"
            className={classNames(
              pathname === "/troops" ? "hot-text" : "",
              "hover:cool-text hover:opacity-70 transition-all duration-500 "
            )}
          >
            Troops
          </Link>
        </nav>
      </div>
      <div className="navbar-end gap-x-4">
        <div className="hidden md:block">
          <Web3Button icon="hide" balance="hide" />
        </div>
        <button className="lg:hidden btn bg-secondary/20 hover:bg-secondary/40">
          <CgMenuRightAlt className="text-3xl text-white" />
        </button>
      </div>
    </header>
  );
};
