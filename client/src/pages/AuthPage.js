import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import useHttp from "../hooks/useHttp";
import useMessage from "../hooks/useMessage";

const AuthPage = () => {
  const auth =useContext(AuthContext);
  const message = useMessage()
  const [ request, isLoading ] = useHttp();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (ev) => {
    setCredentials({
      ...credentials,
      [ev.target.id]: ev.target.value,
    });
  };

  const onSignup = async () => {
    try {
      const {token, userId} = await request("/auth/signup", "POST", {...credentials});
      auth.signup(token, userId);
      message("User created.");
    } catch (e) {
      message(e.message);
    }
  }

  const onLogin = async () => {
    try {
      const {token, userId} = await request("/auth/login", "POST", { ...credentials });
      auth.login(token, userId);
    } catch (e) {
      message(e.message)
    }
  };

  return (
    <div className="row" style={{ marginTop: "100px" }}>
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: "30px" }}>
              Authentication
            </span>
            <div className="input-field">
              <input
                placeholder="Enter email"
                autoComplete="off"
                id="email"
                type="email"
                className="validate"
                onChange={handleChange}
              />
              <label htmlFor="email" className="active">Email</label>
            </div>
            <div className="input-field" style={{ marginBottom: "0px" }}>
              <input
                placeholder="Enter password"
                id="password"
                type="password"
                className="validate"
                onChange={handleChange}
              />
              <label htmlFor="password" className="active">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              style={{ marginRight: "14px" }}
              onClick={onLogin}
              disabled={isLoading}
            >
              Log in
            </button>
            <button
              className="waves-effect waves-light btn"
              onClick={onSignup}
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
