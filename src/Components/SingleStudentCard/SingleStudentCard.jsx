import React from 'react';
import './singleStudentCard.scss'

function SingleStudentCard(props) {

    function truncate(input) {
        if (input.length > 18) {
           return input.substring(0, 18) + '...';
        }
        return input;
     };
    return (
        <div className="singleStudent-container" >
            <img src ="https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/student_icon-512.png"></img>
            
            <p id="u_id">{props.props.u_id}</p>
            <p id="rollNo">{props.props.roll_no}</p>
            <p id="name">{truncate(props.props.student_name)}</p>
            <p id="class">{props.props.class}</p>
            <p id="section">{props.props.section}</p>
            <p id="gender">{props.props.gender}</p>
            <p id="contactNumber1">{props.props.contact_no1}</p>
            <p id="address">{truncate(props.props.address)}</p>
            <hr className="hr-underline"></hr>
        </div>
    )
}

export default SingleStudentCard
