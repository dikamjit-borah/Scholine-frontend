import { React, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import "./students.scss";
import axios from "axios";
import SingleStudentCard from "../../../Components/SingleStudentCard/SingleStudentCard";

import { Link } from "react-router-dom";
import loaderimg from "../../../assests/animation/loader.gif";
import BASE_URL from "../../../utilities/constants";
import {
  generateError,
  generateSubmitMsg,
} from "../../../utilities/globalFunctions";
import ViewAttendance from "../../teacher/ViewAttendance/ViewAttendance";
import AddAttendance from "../../teacher/AddAttendance/AddAttendance";

function Students() {
  const headers = {
    u_id: "U_ID",
    admission_no: "ADMISSION NUMBER",
    date_of_admission: "2021-03-19T00:00:00.000Z",
    roll_no: "Roll Number",
    student_name: "Student Name",
    birth_date: "2021-03-19T00:00:00.000Z",
    last_attended_school: "Maria's",
    last_attended_class: "IX",
    no_of_transfer_recipient: 2,
    class: "Class",
    section: "Section",
    caste: "OBC",
    religion: "Hindu",
    gender: "Gender",
    father_name: "Father's Name",
    father_occupation: "motheroccupation",
    mother_name: "Mother's Name",
    mother_occupation: "fatheroccupation",
    address: "Address",
    state: "Assam",
    district: "Kamrup",
    pin: 781100,
    contact_no_1: "Contact Number",
    contact_no_2: "9888999911",
    createdAt: "2021-03-19T11:03:18.000Z",
    updatedAt: "2021-03-19T11:03:18.000Z",
  };
  const url = "192.168.29.207:8080";
  const [dataLength, setDataLength] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);

  const [filterType, setFilterType] = useState("student_name");
  const [isError, setIsError] = useState(false);

  function handleFilter(sel) {
    setFilterType(sel);
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${BASE_URL}/students`)
        .then((response) => {
          setData(response.data);
          setDataLength(response.data.length);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log("xxxx", err);
          setIsLoaded(true);
          setIsError(true);
        });
    };

    fetchData();
  }, []);

  async function searchStudent(event) {
    event.preventDefault();

    setIsLoaded(false);
    let searchReq = {
      searchTerm: event.target[0].value,
      searchType: filterType,
    };
    await axios
      .post(`${BASE_URL}/students/search`, searchReq)
      .then((response) => {
        setData(response.data.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log("search", err);
        setIsLoaded(true);
        setIsError(true);
      });
  }

  if (isLoaded) {
    return (
      <div className="parent-container">
        {isError ? generateError("Something went wrong") : null}
        <form
          className="search-filter"
          onSubmit={(e) => {
            searchStudent(e);
          }}
        >
          <div class="search-box">
            <input
              required="true"
              type="text"
              class="search-input"
              placeholder="Search Students"
            />
          </div>
          <div className="dropdown">
            <Dropdown className="select-filter" required="true">
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                required="true"
              >
                {filterType === "student_name"
                  ? "Name"
                  : filterType === "roll_no"
                  ? "Roll No"
                  : filterType === "class"
                  ? "Class"
                  : filterType}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  className="dropdownItem"
                  onClick={() => {
                    handleFilter("student_name");
                  }}
                >
                  Name
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdownItem"
                  onClick={() => {
                    handleFilter("roll_no");
                  }}
                >
                  Roll No
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdownItem"
                  onClick={() => {
                    handleFilter("class");
                  }}
                >
                  Class
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </form>

        <div className="allStudents-container">
          <div className="singleStudent-heading">
            <img src="https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/student_icon-512.png"></img>

            <p id="u_id">{headers.u_id}</p>
            <p id="rollNo">{headers.roll_no}</p>
            <p id="name">{headers.student_name}</p>
            <p id="class">{headers.class}</p>
            <p id="section">{headers.section}</p>

            <p id="gender">{headers.gender}</p>
            <p id="contactNumber1">{headers.contact_no1}</p>
            <p id="address">{headers.address}</p>
            <hr className="hr-underline"></hr>
          </div>
          {data.map((element) => {
            return (
              <Link
                className="studentCardLink"
                key={element.u_id}
                to={`/main/students/${element.u_id}`}
              >
                <SingleStudentCard props={element} />
              </Link>
            );
          })}
        </div>
      
      </div>
    );
  }
  
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
}

export default Students;
