import { useEffect, useState } from "react";
import ShoppingListIdContext from "../../contexts/ShoppingListId";
import { useContextSafe } from "../../hooks/useContextSafe";
import CreateItemForm from "../../components/CreateItemForm";
import CreateMemberForm from "../../components/CreateMemberForm";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  Box,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import ListMemberTable from "../../components/ListMemberTable";
import ListItemTable from "../../components/ListItemTable";
import { ShoppingListItem, ShoppingListMember } from "../../types/shoppingList";
import LayoutRoot from "../../components/LayoutRoot";

function ShoppingListId() {
  const {
    state: { shoppingList },
    mutations: { setName, setMembers, setItems },
  } = useContextSafe(ShoppingListIdContext);

  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const [showOnlyActiveItems, setShowOnlyActiveItems] = useState(false);

  const currentUserId = currentUser.id;
  const isCurrentUserOwner = shoppingList.owner.id === currentUserId;
  const isCurrentUserMember = shoppingList.members.some(
    (member) => member.id === currentUserId,
  );
  const isCurrentUserMemberOrOwner = isCurrentUserMember || isCurrentUserOwner;

  const filteredItems = showOnlyActiveItems
    ? shoppingList.items.filter((item) => item.status === "Active")
    : shoppingList.items;

  const handleItemAdd = (e: { name: string }) => {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: Math.random().toString(),
        name: e.name,
        status: "Active",
      },
    ]);
  };

  const handleItemChange = (e: { item: ShoppingListItem }) => {
    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === e.item.id ? e.item : currentItem,
      ),
    );
  };

  const handleItemDelete = (e: { item: ShoppingListItem }) => {
    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== e.item.id),
    );
  };

  const handleMemberAdd = (e: { name: string }) => {
    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: Math.random().toString(),
        name: e.name,
        joinedAt: new Date(),
      },
    ]);
  };

  const handleMemberDelete = (e: { member: ShoppingListMember }) => {
    setMembers((currentMembers) =>
      currentMembers.filter(
        (currentMember) => currentMember.id !== e.member.id,
      ),
    );
  };

  useEffect(() => {
    if (!isCurrentUserMemberOrOwner) {
      navigate("/");
    }
  }, [isCurrentUserMemberOrOwner, navigate]);

  return (
    <LayoutRoot>
      <Grid container spacing={2} p={4}>
        <Grid item xs={12}>
          <Box component={Paper} p={2}>
            <Box mb={2}>
              <TextField
                fullWidth
                inputProps={{ readOnly: !isCurrentUserOwner }}
                value={shoppingList.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>
                <FormattedMessage
                  id="views.shoppinglistid.owner"
                  values={{ name: shoppingList.owner.name }}
                />
              </Typography>
              {isCurrentUserOwner && (
                <Typography>
                  (<FormattedMessage id="views.shoppinglistid.me" />)
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component={Paper} p={2}>
            <Box mb={2}>
              <Typography variant="h5">
                <FormattedMessage id="views.shoppinglistid.members" />
              </Typography>
            </Box>
            <ListMemberTable
              isCurrentUserOwner={isCurrentUserOwner}
              currentUser={currentUser}
              members={shoppingList.members}
              onDelete={handleMemberDelete}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box component={Paper} p={2}>
            <Typography variant="h5">
              <FormattedMessage id="views.shoppinglistid.addMember" />
            </Typography>
            {!isCurrentUserOwner && (
              <Typography variant="body2">
                <FormattedMessage id="views.shoppinglistid.onlyOwnerMembers" />
              </Typography>
            )}
            <CreateMemberForm
              disabled={!isCurrentUserOwner}
              onSubmit={handleMemberAdd}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component={Paper} p={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="h5">
                <FormattedMessage id="views.shoppinglistid.items" />
              </Typography>
              <Box component="label" display="flex" alignItems="center">
                <Checkbox
                  checked={showOnlyActiveItems}
                  onChange={(e) => setShowOnlyActiveItems(e.target.checked)}
                />
                <FormattedMessage id="views.shoppinglistid.showOnlyActive" />
              </Box>
            </Box>
            <ListItemTable
              items={filteredItems}
              onChange={handleItemChange}
              onDelete={handleItemDelete}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box component={Paper} p={2}>
            <Typography variant="h5">
              <FormattedMessage id="views.shoppinglistid.addItem" />
            </Typography>
            <CreateItemForm onSubmit={handleItemAdd} />
          </Box>
        </Grid>
      </Grid>
    </LayoutRoot>
  );
}

export default ShoppingListId;
