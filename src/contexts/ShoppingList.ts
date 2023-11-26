import { createContext } from "react";
import { ShoppingListOverview } from "../types/shoppingList";

const ShoppingListContext = createContext<{
  state: { list: ShoppingListOverview[] };
  mutations: {
    createShoppingList: (name: string) => Promise<void>;
    deleteShoppingList: (id: string) => Promise<void>;
  };
} | null>(null);
ShoppingListContext.displayName = "ShoppingListContext";
export default ShoppingListContext;
