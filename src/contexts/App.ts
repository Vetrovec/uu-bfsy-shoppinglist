import { createContext } from "react";

const AppContext = createContext<{
  state: {
    selectedLanguage: "cs" | "en";
    selectedTheme: "light" | "dark";
  };
  mutations: {
    setSelectedLanguage: (language: "cs" | "en") => void;
    setSelectedTheme: (theme: "light" | "dark") => void;
  };
} | null>(null);
AppContext.displayName = "AppContext";
export default AppContext;
