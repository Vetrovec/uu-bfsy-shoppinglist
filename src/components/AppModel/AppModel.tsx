import { useMemo, useState } from "react";
import AppContext from "../../contexts/App";

interface AppModelProps {
  children: React.ReactNode;
}

function AppModel({ children }: AppModelProps) {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const appValue = useMemo(
    () => ({
      state: {
        selectedTheme,
      },
      mutations: {
        setSelectedTheme,
      },
    }),
    [selectedTheme],
  );

  return <AppContext.Provider value={appValue}>{children}</AppContext.Provider>;
}

export default AppModel;
