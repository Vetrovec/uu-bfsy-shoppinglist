import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useContextSafe } from "../../hooks/useContextSafe";
import AppContext from "../../contexts/App";
import { DarkModeOutlined } from "@mui/icons-material";

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
    state: { selectedTheme },
    mutations: { setSelectedTheme },
  } = useContextSafe(AppContext);

  const theme = selectedTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
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
              <Button
                color="inherit"
                onClick={() =>
                  setSelectedTheme(selectedTheme === "dark" ? "light" : "dark")
                }
              >
                <DarkModeOutlined />
              </Button>
            </Box>
          </Box>
        </AppBar>
        <Box>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default LayoutRoot;
