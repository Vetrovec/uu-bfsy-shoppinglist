import { createContext } from "react";
import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListMember,
} from "../types/shoppingList";

const ShoppingListIdContext = createContext<{
  state: { shoppingList: ShoppingList };
  mutations: {
    setName: React.Dispatch<React.SetStateAction<string>>;
    setMembers: React.Dispatch<React.SetStateAction<ShoppingListMember[]>>;
    setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>;
  };
} | null>(null);
ShoppingListIdContext.displayName = "ShoppingListIdContext";
export default ShoppingListIdContext;
