import { check_signin } from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
  check_signin(window.location.pathname);
  return children;
};
      