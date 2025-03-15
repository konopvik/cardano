import type { FC } from "react";

import { ThemeIcon } from "../global/ThemeIcon";
import { SearchInput } from "../search/SearchInput";

import { useCallback, useEffect, useState } from "react";

export const Header: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 0);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between gap-2 bg-background fixed transition-all duration-50 left-0 top-0 right-0 z-20   w-[100vw] h-[70px] px-lg ${
        scrolled ? " shadow-header" : ""
      }`}
    >
      <span className='text-sm md:text-[24px] text-primary font-semibold'>
        Cardano Explorer
      </span>
      <SearchInput />
      <ThemeIcon />
    </div>
  );
};
