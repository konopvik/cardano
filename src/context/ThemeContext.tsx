import type { FC, PropsWithChildren } from "react";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {
    throw new Error("Function is not implemented.");
  },
});

export const useTheme = () => useContext(ThemeContext);

const THEME_KEY = "theme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const themeStore = localStorage.getItem(THEME_KEY);

    if (themeStore) {
      setTheme(themeStore as Theme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      localStorage.setItem(THEME_KEY, newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
