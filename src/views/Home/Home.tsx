import { Paper, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      minHeight="100%"
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Box
        component={Paper}
        display="flex"
        flexDirection="column"
        p={2}
        gap={2}
      >
        <Link to="/shopping-list/1">Open Shopping List 1 (as owner)</Link>
        <Link to="/shopping-list/2">Open Shopping List 2 (as member)</Link>
      </Box>
    </Box>
  );
}

export default Home;
