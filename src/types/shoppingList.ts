export type ShoppingListItemStatus = "Active" | "Resolved";

export interface ShoppingListItem {
  id: string;
  name: string;
  status: ShoppingListItemStatus;
}

export interface ShoppingListUser {
  id: string;
  name: string;
}

export interface ShoppingListMember extends ShoppingListUser {
  joinedAt: Date;
}

export interface ShoppingListOverview {
  id: string;
  name: string;
  owner: ShoppingListUser;
}

export interface ShoppingList extends ShoppingListOverview {
  members: ShoppingListMember[];
  items: ShoppingListItem[];
}
