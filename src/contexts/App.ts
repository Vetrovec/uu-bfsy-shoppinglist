import { createContext } from "react";

const AppContext = createContext<{
  state: { selectedTheme: "light" | "dark" };
  mutations: {
    setSelectedTheme: (theme: "light" | "dark") => void;
  };
} | null>(null);
AppContext.displayName = "AppContext";
export default AppContext;
