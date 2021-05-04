import React from "react";
import Form from "react-bootstrap/Form";

function AddAttendanceCard(props) {


    

  return (
    <div>
      <div className="singleStudent-container">
        <img src="https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/student_icon-512.png"></img>

        <p id="u_id">{props.props.u_id}</p>
        <p id="rollNo">{props.props.roll_no}</p>
        <p id="name">{props.props.student_name}</p>
        <p id="class">{props.props.class}</p>
        <p id="section">{props.props.section}</p>
        <p id="markAttendance">
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label=" &nbsp; Mark as Present" />
          </Form.Group>
        </p>

        <hr className="hr-underline"></hr>
      </div>
    </div>
  );
}

export default AddAttendanceCard;
