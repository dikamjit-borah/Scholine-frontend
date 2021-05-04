import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faUsers,
  faUserPlus,
  faHandPaper
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const location = useLocation();
  const activeRoute = (page) => {
    return location.pathname.indexOf(page) > -1 ? "active" : "";
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div className="sidebar_header">
          <p className="navHeading">Scholine<span style={{ fontFamily: "Monoton"}}>+</span></p>
           
          </div>
          <ul className="nav">
            <li className={activeRoute("home")}>
              <Link to="/main/home" className="nav_link">
                <FontAwesomeIcon className="icon" icon={faHouseUser} />
                <p>Home</p>
              </Link>
            </li>
            <li className={activeRoute("students")}>
              <Link to="/main/students" className="nav_link">
                <FontAwesomeIcon className="icon" icon={faUsers} />
                <p>Students</p>
              </Link>
            </li>

            <li className={activeRoute("add student")}>
              <Link to="/main/add student" className="nav_link">
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
                <p>Add Student</p>
              </Link>
            </li>


            <li className={activeRoute("attendance")}>
              <Link to="/main/attendance" className="nav_link">
                <FontAwesomeIcon className="icon" icon={faHandPaper} />
                <p>Attendance</p>
              </Link>
            </li>


    


          </ul>
        </div>
      </div>
      <ul className="nav">
        <li>
          <Link className="nav_link">
            <FontAwesomeIcon className="icon" icon={faHouseUser} />
            <p>Home</p>
          </Link>
        </li>
        <li className="active">
          <Link className="nav_link">
            <FontAwesomeIcon className="icon" icon={faUsers} />
            <p>Students</p>
          </Link>
        </li>
        <li className="active">
          <Link className="nav_link" to="">
            <FontAwesomeIcon className="icon" icon={faUsers} />
            <p>Add Students</p>
          </Link>
        </li>

        
        <li className="active">
              <Link to="" className="nav_link">
                <FontAwesomeIcon className="icon" icon={faHandPaper} />
                <p>Attendance</p>
              </Link>
            </li>
      </ul>
    </>
    //   </div>
    // </div>
  );
}

export default Sidebar;
