import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useContextSafe } from "../../hooks/useContextSafe";
import AppContext from "../../contexts/App";
import { DarkModeOutlined } from "@mui/icons-material";
import { IntlProvider } from "react-intl";
import { getMessages } from "../../translations";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface LayoutRootProps {
  children: React.ReactNode;
}

function LayoutRoot({ children }: LayoutRootProps) {
  const {
    state: { selectedLanguage, selectedTheme },
    mutations: { setSelectedLanguage, setSelectedTheme },
  } = useContextSafe(AppContext);

  const theme = selectedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale={selectedLanguage}
        messages={getMessages(selectedLanguage)}
      >
        <Box
          minHeight="100%"
          style={{ backgroundColor: theme.palette.background.default }}
        >
          <AppBar position="static">
            <Box
              component={Toolbar}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="h6">Shopping List</Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Select
                  size="small"
                  variant="outlined"
                  value={selectedLanguage}
                  componentsProps={{
                    root: {
                      style: {
                        backgroundColor: theme.palette.background.paper,
                      },
                    },
                  }}
                  onChange={(e) =>
                    setSelectedLanguage(e.target.value as "cs" | "en")
                  }
                >
                  <MenuItem value="cs">Čeština</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
                <Button
                  color="inherit"
                  onClick={() =>
                    setSelectedTheme(
                      selectedTheme === "dark" ? "light" : "dark",
                    )
                  }
                >
                  <DarkModeOutlined />
                </Button>
              </Box>
            </Box>
          </AppBar>
          <Box>{children}</Box>
        </Box>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default LayoutRoot;
