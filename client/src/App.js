import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useRoutes from "./routs";
import AuthContext from "./context/authContext";
import "materialize-css";

function App() {
  const { login, signup, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ login, signup, logout, token, userId }}>
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

// return (
//   <AuthContext.Provider value={{ login, logout, token, userId }}>
//     <Loader isActive={!token}>
//       <div className="container">{routes}</div>
//     </Loader>
//   </AuthContext.Provider>
// );

export default App;
