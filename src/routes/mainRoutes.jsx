import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*------ Pages-----*/
import SignIn from "../Pages/SignIn";
// import Service from "./../pages/Service1";
import NotFound from "../Pages/404";
import LandingPage from "../Pages/LandingPage"
import ProtectedRoutes from "./../components/common/routes/protectedRoute";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
