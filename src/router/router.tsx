import { createBrowserRouter } from "react-router-dom";
import Form from "../pages/Form";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/form/:operation",
    element: <Form />,
  },
]);

export default router;
