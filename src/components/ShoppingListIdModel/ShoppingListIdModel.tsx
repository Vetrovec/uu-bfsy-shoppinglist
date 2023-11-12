import { useMemo, useState } from "react";
import ShoppingListIdContext from "../../contexts/ShoppingListId";
import { ShoppingList } from "../../types/shoppingList";

interface Props {
  shoppingList: ShoppingList;
  children: React.ReactNode;
}

function ShoppingListIdModel({ children, shoppingList }: Props) {
  const [name, setName] = useState(shoppingList.name);
  const [members, setMembers] = useState(shoppingList.members);
  const [items, setItems] = useState(shoppingList.items);

  const value = useMemo(
    () => ({
      state: {
        shoppingList: {
          ...shoppingList,
          name,
          members,
          items,
        },
      },
      mutations: {
        setName,
        setMembers,
        setItems,
      },
    }),
    [items, members, name, shoppingList],
  );

  return (
    <ShoppingListIdContext.Provider value={value}>
      {children}
    </ShoppingListIdContext.Provider>
  );
}

export default ShoppingListIdModel;
