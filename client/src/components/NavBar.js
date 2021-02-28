import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/authContext";

const NavBar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onLogout = (ev) => {
    ev.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper" style={{ padding: "0 2rem" }}>
        <span style={{ userSelect: "none", fontSize: "25px" }}>Todos</span>
        <ul className="right">
          <li>
            <NavLink to="/create">Add</NavLink>
          </li>
          <li>
            <NavLink to="/todos">Home</NavLink>
          </li>
          <li>
            <a href="/" onClick={onLogout}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
