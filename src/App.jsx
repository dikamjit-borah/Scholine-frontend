import { Redirect, Route, Switch } from "react-router-dom";
import React,{useState} from "react";
import MainLayout from "./Layouts/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/principal/Log In/LogIn";
import PrivateRoute from "./Components/Private Route/PrivateRoute";
import AttendanceContextProvider from "./Contexts/attendanceContext";

function App() {
  return (
    <Switch>
        <PrivateRoute path="/main/" component={MainLayout} />
        <Route path="/auth/login" component={Login} />
        <Redirect from="/" to="/main/home" />
    </Switch>
  );
}

export default App;
