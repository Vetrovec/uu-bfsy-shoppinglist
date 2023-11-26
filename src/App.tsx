import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import ShoppingListId from "./routes/shopping-list-id";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: async ({ request }) => {
        const response = await fetch(`/mock/shopping-list.json`, {
          signal: request.signal,
        });
        const data = await response.json();
        return data;
      },
    },
    {
      path: "/shopping-list/:id",
      element: <ShoppingListId />,
      loader: async ({ params, request }) => {
        const id = params.id!;

        let url;
        // Whitelist the ids with mock data
        if (["sl-1", "sl-2"].includes(id)) {
          url = `/mock/shopping-list/${id}.json`;
        } else {
          url = `/mock/shopping-list/empty.json`;
        }

        const response = await fetch(url, {
          signal: request.signal,
        });
        const data = await response.json();
        return data;
      },
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
