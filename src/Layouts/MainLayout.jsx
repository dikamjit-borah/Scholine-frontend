import React from "react";
import Navbar from "../Components/Main Nav/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./style.scss";
import routes from "./../routes";
import { Route } from "react-router";
import AttendanceContextProvider from "../Contexts/attendanceContext";

const getAllRoutes = () => {
  return routes.map((page) => (
      <Route exact path={`${page.layout}${page.path}`} component={page.page} />
  ));
};

function MainLayout() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="content_body">
        <AttendanceContextProvider>
          {getAllRoutes()}
        </AttendanceContextProvider>
          </div>
      </div>
    </div>
  );
}
export default MainLayout;