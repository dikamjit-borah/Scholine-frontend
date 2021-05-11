import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import "./login.scss";
import BASE_URL from "../../../utilities/constants";
import { useHistory, useLocation } from "react-router";
import { auth } from "../../../helper/auth";
import loaderimg from "../../../assests/animation/loader.gif";

import {
  generateError,
  generateSubmitMsg,
} from "../../../utilities/globalFunctions";

function Login() {
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const [loginStatus, setLoginStatus] = useState("notLoggedIn");
  const [errorCode, setErrorCode] = useState();

  //   const reloadPage = () => {
  //     // window.location.reload ();
  //     setIsError(false);
  //   }

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      history.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // window.location.reload ();
    setIsError(false);
    setLoginStatus("LoggingIn");
    axios
      .post(`${BASE_URL}/login`, {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setLoginStatus("LoggedIn");
        window.location.reload();
      })
      .catch((err) => {
        setIsError(true);
        setErrorCode(err.response.status);
      });
  };

  //   const loader = () => {
  //     <span className="loader">
  //       {loginStatus === "notLoggedIn" ? null : loginStatus === "LoggingIn" ? (
  //         <img className="loader-gif" src={loader} alt="Loading..." />
  //       ) : (
  //         "Logged In"
  //       )}
  //     </span>;
  //   };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <p>*test credentials*</p>
        <p style={{
          backgroundColor:"#bdbdbd"
        }}>admin@gmail.com <b>123</b></p>
        <div className="login-form-header">
        
          <div className="login-form-header-name">
            <p>Scholine <span style={{color:"rgba(15, 32, 39, 1)", fontFamily: "Monoton"}}>+</span></p>
            <div className="login-form-subheader"></div>
          </div>
          <hr></hr>
        </div>
      

        <div className="login-form-input">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupEmail" className="email-form">
              {/* <Form.Label className='email'>Email address</Form.Label> */}
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="email-emoji"  style={{width:"3.5rem"}}>📧</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="email"
                  className="email-input"
                  placeholder="Enter email"
                  required="true"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formGroupPassword" className="email-form">
              {/* <Form.Label className='email'>Password</Form.Label> */}
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="email-emoji" style={{width:"3.5rem"}}>🔒</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="password"
                  className="email-input"
                  placeholder="Enter password"
                  required="true"
                />
              </InputGroup>
            </Form.Group>

            {isError ? (
              generateError(errorCode)
            ) : (
              <span className="loader">
                {loginStatus === "notLoggedIn" ? null : loginStatus ===
                  "LoggingIn" ? (
                  <img
                    style={{ width: "10rem", height: "auto" }}
                    src={loaderimg}
                    alt="Loading..."
                  />
                ) : (
                  "Logged In"
                )}
              </span>
            )}
            <div className="button-div">
              <button className="button">Log In</button>
              {/* <span >{ loginStatus=== "notLoggedIn" ? null : loginStatus === "LoggingIn"?<img src={loader} alt="Loading..." /> :"Logged In"}</span> */}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
