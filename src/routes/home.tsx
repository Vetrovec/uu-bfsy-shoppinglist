import { useLoaderData } from "react-router-dom";
import HomeView from "../views/Home";
import ShoppingListModel from "../components/ShoppingListModel";
import { ShoppingListOverview } from "../types/shoppingList";

function Home() {
  const data = useLoaderData() as { list: ShoppingListOverview[] };

  return (
    <ShoppingListModel list={data.list}>
      <HomeView />
    </ShoppingListModel>
  );
}

export default Home;
