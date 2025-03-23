import type { Route } from "./+types/home";
import Signup from "../welcome/welcome";
import Login from "../welcome/login";
import Dashboard from "../welcome/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Signup />;
}
