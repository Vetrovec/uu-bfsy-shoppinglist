import { ShoppingListUser } from "../types/shoppingList";

const currentUserMock: ShoppingListUser = {
  id: "u-1",
  name: "John Doe",
};

export default function useCurrentUser() {
  return currentUserMock;
}
