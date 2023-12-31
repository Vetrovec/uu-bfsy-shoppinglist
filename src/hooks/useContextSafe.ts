import { useContext } from "react";

export function useContextSafe<T>(context: React.Context<T | null>): T {
  const value = useContext(context);
  if (!value) {
    throw new Error(`useContextSafe: ${context.displayName} is null`);
  }
  return value;
}
