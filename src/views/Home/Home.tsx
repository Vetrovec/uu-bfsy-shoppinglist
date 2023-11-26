import { Link } from "react-router-dom";
import { useContextSafe } from "../../helpers/useContextSafe";
import ShoppingListContext from "../../contexts/ShoppingList";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import DeleteListDialog from "../../components/DeleteListDialog";
import CreateListDialog from "../../components/CreateListDialog";

function Home() {
  const {
    state: { list },
    mutations: { createShoppingList, deleteShoppingList },
  } = useContextSafe(ShoppingListContext);

  const theme = useTheme();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);

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

        <Grid container spacing={2}>
          {list.map((overview) => (
            <Grid item key={overview.id} xs={12} sm={6} md={4} lg={3}>
              <Box component={Paper} p={2}>
                <Typography noWrap variant="h6">
                  {overview.name}
                </Typography>
                <Typography noWrap>Owner: {overview.owner.name}</Typography>
                <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                  <Link to={`/shopping-list/${overview.id}`}>
                    <Button variant="outlined" size="small">
                      Open
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => setOpenDeleteDialog(overview.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
