import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import ShoppingListId from "./routes/shopping-list-id";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shopping-list/:id",
      element: <ShoppingListId />,
      loader: async ({ params, request }) => {
        const response = await fetch(`/mock/shopping-list/${params.id}.json`, {
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
