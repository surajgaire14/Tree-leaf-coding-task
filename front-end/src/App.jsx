import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
