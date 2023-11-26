import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useContextSafe } from "../../helpers/useContextSafe";
import ShoppingListContext from "../../contexts/ShoppingList";
import DeleteListDialog from "../../components/DeleteListDialog";
import CreateListDialog from "../../components/CreateListDialog";
import ShoppingListTile from "../../components/ShoppingListTile";
import useCurrentUser from "../../hooks/useCurrentUser";

function Home() {
  const {
    state: { list },
    mutations: { createShoppingList, deleteShoppingList },
  } = useContextSafe(ShoppingListContext);

  const currentUser = useCurrentUser();

  const theme = useTheme();

  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);

  const filteredList = useMemo(() => {
    if (!showOnlyActive) {
      return list;
    }
    return list.filter((target) => target.status === "Active");
  }, [list, showOnlyActive]);

  const handleCreateShoppingList = (e: { name: string }) => {
    createShoppingList(e.name);
    setOpenCreateModal(false);
  };

  const handleDeleteShoppingList = () => {
    if (!openDeleteDialog) {
      return;
    }
    deleteShoppingList(openDeleteDialog);
    setOpenDeleteDialog(null);
  };

  return (
    <Box
      minHeight="100%"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <CreateListDialog
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onConfirm={handleCreateShoppingList}
      />

      <DeleteListDialog
        open={Boolean(openDeleteDialog)}
        onCancel={() => setOpenDeleteDialog(null)}
        onConfirm={handleDeleteShoppingList}
      />

      <Box display="flex" flexDirection="column" p={4} gap={2}>
        <Box
          component={Paper}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Typography variant="h5">Create new shopping list</Typography>
          <Button variant="outlined" onClick={() => setOpenCreateModal(true)}>
            Create
          </Button>
        </Box>

        <Box component={Paper} px={2} py={0.5}>
          <Box
            component="label"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Checkbox
              checked={showOnlyActive}
              onChange={(e) => setShowOnlyActive(e.target.checked)}
            />
            <Typography>Show only active</Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {filteredList.map((overview) => (
            <Grid item key={overview.id} xs={12} sm={6} md={4} lg={3}>
              <ShoppingListTile
                currentUser={currentUser}
                overview={overview}
                onDelete={() => setOpenDeleteDialog(overview.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
