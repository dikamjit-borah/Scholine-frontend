import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../../../utilities/constants";
import loaderimg from "../../../assests/animation/loader.gif";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AttendanceContextVariable } from "../../../Contexts/attendanceContext";
import AddAttendanceCard from "../../../Components/AddAttendanceCard/AddAttendanceCard";
import "./addAttendance.scss";

function AddAttendance() {

  const { value, setValue } = useContext(AttendanceContextVariable);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const fetchData = async () => {
      await axios(`${BASE_URL}/students`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
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

  function openModel() {}

  if (isLoaded) {
    return (
      <div className="addAttendance-container">

        <p> <b>{value.date} </b> Attendance for Class {value.class}, {value.section}</p>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to submit attendance?</Modal.Body>
          <Modal.Footer>
            <Button className="button-addAttendance" variant="danger" onClick={handleClose}>
              No, don't submit
            </Button>
            <Button className="button-addAttendance" variant="success" onClick={handleClose}>
              Yes, submit attendance
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="singleStudent-heading">
          <img src="https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/student_icon-512.png"></img>

          <p id="u_id">STUDENT ID</p>
          <p id="rollNo">ROLL NUMBER</p>
          <p id="name">NAME</p>
          <p id="class">CLASS</p>
          <p id="section">SECTION</p>
          <p id="section">MARK ATTENDANCE</p>
          <hr className="hr-underline"></hr>
        </div>
        {data.map((element) => {
          console.log(element);
          return <AddAttendanceCard props={element}></AddAttendanceCard>;
        })}
        <Button className="button-addAttendance" variant="dark" onClick={handleShow}>
          Submit Attendance
        </Button>{" "}
      </div>
    );
  } else {
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
}

export default AddAttendance;
