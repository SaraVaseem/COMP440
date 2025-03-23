import {  type RouteConfig,
    route,
    index,
    layout,
    prefix, } from "@react-router/dev/routes";
    import Signup from "./welcome/welcome";
    import Login from "./welcome/login";
    import Dashboard from "./welcome/dashboard";    

export default [index("routes/home.tsx"),
    route("/home", "./welcome/dashboard.tsx"),
      route("/login", "./welcome/login.tsx"),
] satisfies RouteConfig;
