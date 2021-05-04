import { useContext, React, useState } from "react";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import "./attendance.scss";
import { AttendanceContextVariable } from "../../../Contexts/attendanceContext";

function Attendance() {
  const { value, setValue } = useContext(AttendanceContextVariable);
  let classes = [
    "KG",
    "NUR",
    "PREP",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ];
  const [isMarkAttendance, setIsMarkAttendance] = useState(true);
  const [btn1Variant, setBtn1Variant] = useState("dark");
  const [btn2Variant, setBtn2Variant] = useState("secondary");
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    let allFormData = {};

    for (let i = 0; i < event.target.length; i++) {
      allFormData[event.target[i].id] = event.target[i].value;
    }
    setValue({
      date: allFormData["date"],
      class: allFormData["class"],
      section: allFormData["section"],
    });
    history.push("/main/add attendance/");
  }

  return (
    <div className="attendance-container">
      <div className="attendance-buttons">
  
        <Button
          variant={btn1Variant}
          onClick={() => {
            setIsMarkAttendance(true);
            setBtn1Variant("dark");
            setBtn2Variant("secondary");
          }}
        >
          Mark Attendance
        </Button>
        <Button
          variant={btn2Variant}
          onClick={() => {
            setIsMarkAttendance(false);
            setBtn1Variant("secondary");
            setBtn2Variant("dark");
          }}
        >
          View Attendances
        </Button>
      </div>

      {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
      <Form className="attendance-form" onSubmit={(e) => handleSubmit(e)}>
        {isMarkAttendance ? (
          <Form.Group controlId="date" className="multiFieldsItem">
            <Form.Label className="formTitle">Select Date</Form.Label>
            <Form.Control
              className="formInput"
              type="date"
              placeholder=""
              required="true"
            />
          </Form.Group>
        ) : null}

        <div className="multiFields">
          <Form.Group controlId="class" className="multiFieldsItem">
            <Form.Label className="formTitle">Class</Form.Label>
            <Form.Control className="formInput" as="select">
              {classes.map((element) => {
                return <option>{element}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="section" className="multiFieldsItem">
            <Form.Label className="formTitle">Section</Form.Label>
            <Form.Control className="formInput" as="select">
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </Form.Control>
          </Form.Group>
        </div>

       
          <Button type="submit" variant="success">
            {isMarkAttendance
              ? "Go to mark attendance"
              : "Go to view attendance"}
          </Button>
      
      </Form>
    </div>
  );
}

export default Attendance;
