import { useMemo, useState } from "react";
import AppContext from "../../contexts/App";

interface AppModelProps {
  children: React.ReactNode;
}

function AppModel({ children }: AppModelProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<"cs" | "en">("en");
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const appValue = useMemo(
    () => ({
      state: {
        selectedLanguage,
        selectedTheme,
      },
      mutations: {
        setSelectedLanguage,
        setSelectedTheme,
      },
    }),
    [selectedLanguage, selectedTheme],
  );

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
}

export default AppModel;
