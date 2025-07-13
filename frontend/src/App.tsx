import Home from "./components/Home";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import Users from "./components/Users";
import AuthProvider from "./context/AuthProvider";

import "./globalstyles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="*">
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};
