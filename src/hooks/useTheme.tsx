import { useEffect } from "react";
import { useSystemTheme } from "./useSystemTheme";
import { useLocalStorageState } from "./useLocalStorageState";

export function useTheme() {
  const { theme: systemTheme } = useSystemTheme();
  const { value: storedTheme, persistValue } = useLocalStorageState("theme");

  const theme = storedTheme || systemTheme;

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    persistValue(newTheme);
  };

  return { theme, toggleTheme };
}
