import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Registration from "./pages/Registration.jsx";
import StaffLogin from "./pages/Staff-Login.jsx";
import Staff from "./pages/Staff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Home/>
      },

      {
        path:"/Registration",
        element:<Registration/>
      },

       {
        path: "/staff-login",
        element: <StaffLogin />,
      },
        {
        path: "/staff",
        element: <Staff/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>
);