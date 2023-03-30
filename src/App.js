import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import MainRoutes from "./routes/mainRoutes";
import { getMe } from "./services/user";
import CustomNavbar from "./components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getMe().then(({ data }) => {
      setUser(data.message);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
        <CustomNavbar />
        <div className="container-fluid">
          <MainRoutes />
        </div>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      </UserContext.Provider>
    </>
  );
};

export default App;
