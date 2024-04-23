import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./pages/Home";
import "remixicon/fonts/remixicon.css";
import Profiles from "./pages/Profiles";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
