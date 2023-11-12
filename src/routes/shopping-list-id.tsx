import { useLoaderData } from "react-router-dom";
import { ShoppingList } from "../types/shoppingList";
import ShoppingListIdModel from "../components/ShoppingListIdModel";
import ShoppingListIdView from "../views/ShoppingListId";

function ShoppingListId() {
  const data = useLoaderData() as ShoppingList;

  return (
    <ShoppingListIdModel shoppingList={data}>
      <ShoppingListIdView />
    </ShoppingListIdModel>
  );
}

export default ShoppingListId;
