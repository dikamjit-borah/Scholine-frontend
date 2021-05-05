import { React, useState, useEffect } from "react";
import "./singleStudentDashboard.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import EditStudentPage from "../EditStudentPage/EditStudentPage";
import loaderimg from "../../../assests/animation/loader.gif";
import BASE_URL from "../../../utilities/constants";
import { generateError } from "../../../utilities/globalFunctions";

function SingleStudentDashboard() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [transferData, settransferData] = useState([]);
  const [globalId, setGlobalId] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    setGlobalId(id);
    fetchData(id);
  }, []);

  const fetchData = async (id) => {
    await axios(`${BASE_URL}/students/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token") 
      }
    })
      .then((response) => {
        setData(response.data.mainData);
        if (response.data.mainData.is_transferred_student === 1) {
          settransferData(response.data.transferDetailData);
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("xxxx", err);
        setIsLoaded(true);
        setIsError(true);
      });
  };

  const refactorKey = (key, value) => {
    if (key === "dp") return "Photo";
    else if (value && key.indexOf("doc") > -1) {
      console.log(key, value);
      value = JSON.parse(value);
      return value.name;
    }
    return key.split("_").join(" ");
  };

  const refactorValue = (key, value) => {
    if (key === "dp")
      return (
        <a href={value} target="_blank">
          {value}
        </a>
      );
    else if (value && key.indexOf("doc") > -1) {
      value = JSON.parse(value);
      return (
        <a href={value.url} target="_blank">
          {value.url}
        </a>
      );
    }
    return value;
  };

  const [isEdit, setIsEdit] = useState(false);

  function editStudentDetails() {
    setIsEdit(true);
  }

  if (!isLoaded)
    return (
      <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{ width: "10rem", height: "auto" }}
        src={loaderimg}
        alt="Loading..."
      />
    </div>
    );
    else if (isError)
    {
        return generateError("Something is very wrong!")
    }
  else if (isEdit) {
    return <EditStudentPage sid={globalId}></EditStudentPage>;
  } else
    return (
      <div className="student-dashboard-container">
        <div className="header">
          <img
            src={
              data.dp
                ? data.dp
                : "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
            }
          ></img>
          <h1>{data.student_name}</h1>

          <div className="right-side">
            <h2 onClick={editStudentDetails}>
              ✏️ <u>Edit student details</u>
            </h2>
            <div className="buttons-div-studentDashboard">
             
                <Link className="anim button" to={`/main/students/${globalId}/fees`}>Fees</Link>
             
                <Link className="anim button">Attendance</Link>
                <Link className="anim button">Exams</Link>
              {/* <button className="anim" id="suspend">
              Suspend Student
            </button> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="mainData-div">
          {Object.keys(data).map(function (key, index) {
            return (
              <div className="item-div-studentDashboard">
                <p className="subtitle">{refactorKey(key, data[key])}</p>
                <p className="title">{refactorValue(key, data[key])}</p>
                <hr />
              </div>
            );
          })}
        </div>

        {data.is_transferred_student ? (
          <div className="transferDetailData-div">
            <h2>
              <u>Transferring Student Details</u>
            </h2>
            <div className="mainData-div">
              {Object.keys(transferData).map(function (key, index) {
                return (
                  <div className="item-div-studentDashboard">
                    {key.startsWith("sub") ? (
                      <div className="item-div-transfer">
                        <p className="subtitle">{refactorKey(key)}</p>
                        <div className="subMarks">
                          <p className="title">
                            {JSON.parse(transferData[key]).name}
                          </p>
                          <p className="subtitle">
                            {JSON.parse(transferData[key]).mark}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div div className="item-div-transfer">
                        <p className="subtitle">{refactorKey(key)}</p>
                        <p className="title">{transferData[key]}</p>
                      </div>
                    )}

                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
}

export default SingleStudentDashboard;
