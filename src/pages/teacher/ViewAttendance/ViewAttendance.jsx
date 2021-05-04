import React from 'react'

function ViewAttendance() {
    return (
        <div>
             <div className="singleStudent-heading">
            <img src="https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/student_icon-512.png"></img>

            <p id="u_id">STUDENT ID</p>
            <p id="rollNo">ROLL NUMBER</p>
            <p id="name">NAME</p>
            <p id="class">CLASS</p>
            <p id="section">SECTION</p>
            <p id="section">CUMULATIVE ATTENDANCE</p>
            <hr className="hr-underline"></hr>
          </div>
        </div>
    )
}

export default ViewAttendance
