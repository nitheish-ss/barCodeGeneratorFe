import React, { useState, useEffect } from "react";
import { UserContext } from "./contexts/userContext";
import MainRoutes from "./routes/mainRoutes";
import { getMe } from "./services/user";

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
        <MainRoutes />
      </UserContext.Provider>
    </>
  );
};

export default App;
