import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/user";

const Home = () => {
  return getCurrentUser() ? (
    <Navigate to="/devices" />
  ) : (
    <Navigate to="/signIn" />
  );
};

export default Home;
