import type { FC } from "react";

import { Moon, SunMoon } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

export const ThemeIcon: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='h-full w-full max-w-[200px] select-none  flex-1 justify-end flex items-center'>
      {theme === "light" ? (
        <SunMoon
          onClick={toggleTheme}
          className='cursor-pointer text-primary'
        />
      ) : (
        <Moon onClick={toggleTheme} className='cursor-pointer text-primary' />
      )}
    </div>
  );
};
