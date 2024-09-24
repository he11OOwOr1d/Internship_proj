import React from "react";
import ReactDOM from "react-dom/client"; // For React 18
import AppLayout from "./components/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import Body from "./components/Body";
import RestaurantMenu from "./components/RestaurantMenu";
import Contactus from "./components/Contactus";
import LoginButton from "./components/sign-in"
import RegisterButton from "./components/signup"
import { Provider } from "react-redux"; // Import from react-redux
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { KindeProvider } from "@kinde-oss/kinde-auth-react"; // Import KindeProvider
import PaymentPage from "./components/Payments";
import ProtectedRoute from "./components/ProtectedRoute";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurantmenu/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/contactus",
        element: <Contactus />,
      },
      {
        path: "/signin",
        element: <LoginButton />,
      },
      {
        path: "/signup",
        element: <RegisterButton />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <KindeProvider
      clientId="f5e131e6f55e4415a3c4268b001346f6"
      domain="https://feastflyer.kinde.com"
      logoutUri="https://intership-proj.vercel.app/"
      redirectUri="https://intership-proj.vercel.app/"
    >
      <Provider store={appStore}>
        <RouterProvider router={routes} />
      </Provider>
    </KindeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
