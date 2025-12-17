import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Covareg from "../pages/covareg/Covareg";
import PrivetRouter from "../routes/PrivetRouter";
import SendParcel from "../pages/SendPercel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels";
import Payment from "../pages/Dashboard/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider";
import PendingRiders from "../pages/Dashboard/riders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/riders/ActiveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Covareg,
      },
      {
        path: "/beARider",
        element: (
          <PrivetRouter>
            <BeARider></BeARider>
          </PrivetRouter>
        ),
      },
      {
        path: "/sendParcel",
        element: (
          <PrivetRouter>
            <SendParcel></SendParcel>
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout></DashboardLayout>
      </PrivetRouter>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      {
        path: "pendingRiders",
        Component: PendingRiders,
      },
      {
        path: "activeRiders",
        Component: ActiveRiders,
      },
    ],
  },
]);
