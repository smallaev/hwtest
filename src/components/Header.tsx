"use client"
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from '../../public/logo.svg';
import Menu from "./Menu";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevOpen => !prevOpen);
  }
  return <>
    <header className="p-[2em] border-b flex justify-between lg:hidden">
      <Bars3Icon className="size-8" onClick={toggleMenu} />
      <Image 
        src={logo}
        width={110}
        height={40}
        alt="logo"
      />
      <MagnifyingGlassIcon className="size-8" />
    </header>
    <section className={menuOpen ? 'lg:hidden block' : 'hidden'}>
      <Menu />
    </section>
  </> 
}

export default Header;