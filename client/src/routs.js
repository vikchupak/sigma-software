import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import CreatePage from "./pages/CreatePage";
import AuthPage from "./pages/AuthPage";

const useRoutes = (isAuthentocated) => {
  if (isAuthentocated) {
    return (
      <Switch>
        <Route path="/todos" exact>
          <TodosPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Redirect to="/todos" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
