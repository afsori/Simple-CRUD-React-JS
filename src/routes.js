import React from "react";

const Stay = React.lazy(() => import("./views/Stay/Forms"));
const Transactions = React.lazy(() => import("./views/Transactions/Charts"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));

const Placetostay = React.lazy(() => import("./views/Placetostay/Forms"));
const Experience = React.lazy(() => import("./views/Experience/Forms"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/stay", name: "Stay", component: Stay },
  { path: "/transactions", name: "Transactions", component: Transactions },
  { path: "/experience", name: "Experience", component: Experience }
];

export default routes;
