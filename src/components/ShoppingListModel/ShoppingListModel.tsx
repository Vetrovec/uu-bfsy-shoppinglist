import { useCallback, useMemo, useState } from "react";
import ShoppingListContext from "../../contexts/ShoppingList";
import { ShoppingListOverview } from "../../types/shoppingList";

interface Props {
  list: ShoppingListOverview[];
  children: React.ReactNode;
}

function ShoppingListModel({ children, list }: Props) {
  const [listState, setListState] = useState(list);

  const createShoppingList = useCallback(async (name: string) => {
    setListState((prevState) => [
      ...prevState,
      {
        id: `sl-${prevState.length + 1}`,
        name,
        owner: {
          id: "u-1",
          name: "John Doe",
        },
        status: "Active",
      },
    ]);
  }, []);

  const deleteShoppingList = useCallback(async (id: string) => {
    setListState((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      state: {
        list: listState,
      },
      mutations: {
        createShoppingList,
        deleteShoppingList,
      },
    }),
    [createShoppingList, deleteShoppingList, listState],
  );

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
}

export default ShoppingListModel;
