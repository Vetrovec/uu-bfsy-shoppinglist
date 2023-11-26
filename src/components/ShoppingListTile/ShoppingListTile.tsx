import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ShoppingListOverview } from "../../types/shoppingList";

interface Props {
  overview: ShoppingListOverview;
  onDelete: () => void;
}

function ShoppingListTile({ overview, onDelete }: Props) {
  return (
    <Box component={Paper} p={2}>
      <Typography noWrap variant="h6">
        {overview.name}
      </Typography>
      <Typography noWrap>Owner: {overview.owner.name}</Typography>
      <Typography noWrap>Status: {overview.status}</Typography>
      <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
        {overview.status === "Active" && (
          <Link to={`/shopping-list/${overview.id}`}>
            <Button variant="outlined" size="small">
              Open
            </Button>
          </Link>
        )}
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default ShoppingListTile;
