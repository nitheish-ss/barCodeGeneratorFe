import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import MainRoutes from "./routes/mainRoutes";
import { getMe } from "./services/user";
import CustomNavbar from "./components/Navbar";

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
        <div className="container-fluid">
          <CustomNavbar />
          <MainRoutes />
        </div>
      </UserContext.Provider>
    </>
  );
};

export default App;
