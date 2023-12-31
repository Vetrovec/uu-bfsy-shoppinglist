import { Box, Button, Paper, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {
  ShoppingListOverview,
  ShoppingListUser,
} from "../../types/shoppingList";

interface Props {
  currentUser: ShoppingListUser;
  overview: ShoppingListOverview;
  onDelete: () => void;
}

function ShoppingListTile({ currentUser, overview, onDelete }: Props) {
  const canOpen = overview.status === "Active";

  const canDelete = overview.owner.id === currentUser.id;

  return (
    <Box component={Paper} p={2}>
      <Typography noWrap variant="h6">
        {overview.name}
      </Typography>
      <Typography noWrap>
        <FormattedMessage
          id="components.shoppinglisttile.owner"
          values={{ name: overview.owner.name }}
        />
      </Typography>
      <Typography noWrap>
        <FormattedMessage
          id="components.shoppinglisttile.status"
          values={{ status: overview.status }}
        />
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
        {canOpen && (
          <Link to={`/shopping-list/${overview.id}`}>
            <Button variant="outlined" size="small">
              <FormattedMessage id="components.shoppinglisttile.open" />
            </Button>
          </Link>
        )}
        <Button
          disabled={!canDelete}
          variant="outlined"
          color="error"
          size="small"
          onClick={onDelete}
        >
          <FormattedMessage id="components.shoppinglisttile.delete" />
        </Button>
      </Box>
    </Box>
  );
}

export default ShoppingListTile;
