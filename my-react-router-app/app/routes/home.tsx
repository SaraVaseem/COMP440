import type { Route } from "./types/home";
import { LoginSignup } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Sign Up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
export default function Home() {
  return <LoginSignup />;
}
