import React, { useState, useEffect } from "react";
// import { Button, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";
// import * as electron from 'electron'
import axios from "axios";
// import Checkbox from "./checkbox";
import "./card.scss";
// import { FALSE, TRUE } from "node-sass";
import loaderimg from "../../../assests/animation/loader.gif"

import BASE_URL from "../../../utilities/constants";
import { generateError } from "../../../utilities/globalFunctions";


export default function Card({ element, id, sid,monthlyFee, tutionError }) {

  console.log("kiiiiik", sid);
  let defaultData = "";
  let defaultColor = "";
  let defaultfeeValue = "";

  if (element == 1) {
    defaultData = "Paid";
    defaultColor = "statusvaluegreen";
    defaultfeeValue = false;
  } else if (element == 0) {
    defaultData = "Not Paid";
    defaultColor = "statusvaluered";
    defaultfeeValue = true;
  }

  const [Status, setStatus] = useState(defaultData);
  const [Color, setColor] = useState(defaultColor);
  const [isBoxVisible, setisBoxVisible] = useState(defaultfeeValue);
  const [loader, setloader] = useState(true);
  const [Notic, setNotic] = useState("");


  // let color = 'danger';
  //   let isBoxVisible = "";
  const statusChangePaid = (id) => {
    setloader(false)
    let selectedMonth = id;

    let xx = {};
    let data = {};
    data["month"] = selectedMonth;
    let feesData = {};
    feesData["s_id"] = sid;
    feesData["type"] = "monthly";
    feesData["data"] = data;
    xx["feesData"] = feesData;

    axios
      .post(`${BASE_URL}/fees/update`, xx,  {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token") 
        }
      })
      .then((res) => { 
        console.log(res.data)
        console.log("data updeted")
        setStatus("Paid");
        setColor("statusvaluegreen");
        // isBoxVisible="boxdisable";
        setisBoxVisible(false);
        setloader(true);
        setNotic("Fees Updated");
        console.log("Fees Updated")
      })
      .catch((err) => {
 
        setNotic("Server down")
    
        setloader(true);
        tutionError()
      });

    console.log(feesData);
  };

  // const statusChangeNotPaid = () => {
  //     setStatus("Not Paid");
  //     setColor('danger');
  //     // console.log("Hello world");
  // }

  // console.log(element);
  let month = "";
  if (id === 0) {
    month = "January";
  } else if (id === 1) {
    month = "February";
  } else if (id === 2) {
    month = "March";
  } else if (id === 3) {
    month = "April";
  } else if (id === 4) {
    month = "May";
  } else if (id === 5) {
    month = "Jun";
  } else if (id === 6) {
    month = "July";
  } else if (id === 7) {
    month = "August";
  } else if (id === 8) {
    month = "Septmember";
  } else if (id === 9) {
    month = "Octber";
  } else if (id === 10) {
    month = "November";
  } else if (id === 11) {
    month = "December";
  }

  return (
    <div className="tutioin-fees-container">
     
      <div className="months">
        <div className="tution-month">
          <p className="month-style">{month}</p>
        </div>
        <hr></hr>
        <div className="tutioin-fees">
          <p className="tution-header-style">Tution Fees</p>
          <p className="tution-style"> ₹{monthlyFee}</p>
        </div>
        <div className="tutioin-fees-status">
          <p className="status-style">
            Status:&nbsp;&nbsp;
            {isBoxVisible ? (
              <label className="status-style-label">
                <input
                  name="example_1"
                  type="checkbox"
                  onClick={() => statusChangePaid(id)}
                />
                &nbsp;
                <span className="boxsize">Mark as Paid.</span>
              </label>
            ) : null}
          </p>
          <div className="tutioin-fees-status-notification">
            <p className={`status-value-style ${Color}`}>{Status}</p>
            <p>{loader ? <div className='loader-style'> </div> : <div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}><img style={{width: "5rem", height: "auto"}} src={loaderimg} alt="Loading..." /></div> }</p>
            <br>
            </br>
          </div>
          <p>
           
            </p>
        </div>
      </div>
    </div>
  );
}
