import React, { useState, useEffect } from "react";
// import { Button, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";
import Card from "../reusable/Tutionfee/Card";
import axios from "axios";
import "./feeslog.scss";

function Feeslog() {
  let defaultfeeValue = "";

  const url = "192.168.29.207:8080";
  const [dataLength, setDataLength] = useState(0);
  const [Studentname, setStudentname] = useState(" ");
  const [Studentrollno, setStudentrollno] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [Fessstatus, setFessstatus] = useState([]);
  const [Admissionstatus, setAdmissionstatus] = useState(" "); // " "
  const [Color, setColor] = useState(" ");
  const [isBoxVisible, setisBoxVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://192.168.29.207:8080/api_v1/fees/101`);

      setData(result.data);
      setFessstatus(result.data.dataResponse.dues.monthly);
      console.log(result);
      setStudentname(result.data.dataResponse.studentName);
      setStudentrollno(result.data.dataResponse.studentRollNo);
     
      if (result.data.dataResponse.dues.admission == 1) {
        setAdmissionstatus("Paid");
        setisBoxVisible(false);
        setColor("statusvaluegreen");
      } else if (result.data.dataResponse.dues.admission == 0) {
        setAdmissionstatus("Not Paid");
        setisBoxVisible(true);
        setColor("statusvaluered")
      }
      //   setAdmissionstatus(result.data.dataResponse.dues.admission);
      setDataLength(result.data.length);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  console.log(Admissionstatus);

  // const [Status, setStatus] = useState(defaultAdmissionfeeValue);
  

  // let color = 'danger';
  const statusChangePaid = () => {
    let xx = {};
    // let data = {}
    // data["month"] = selectedMonth;
    let feesData = {};
    feesData["s_id"] = 101;
    feesData["type"] = "admission";
    // feesData["data"] = data
    xx["feesData"] = feesData;

    setAdmissionstatus("Paid");
    setisBoxVisible(false);
    setColor("statusvaluegreen");

    // console.log("Hello world");
    axios
      .post("http://192.168.29.207:8080/api_v1/fees/update", xx)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const fees = [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1];
  const newFee = [];
  for (let i = 0; i <= Fessstatus.length - 1; i++) {
    if (i == 1 || i % 2 == 1) {
      newFee.push(Fessstatus[i]);
    }
  }
  //   console.log(newFee);
  // console.log(fees[1-1]);

  let currentMonth = new Date().getMonth();
  //   console.log(currentMonth);

  const showMonth = newFee.slice(0, currentMonth + 1);

  return (
    <div className="feeslog-container">
      <br></br>
      <div className="fees-student-info">
        <div className="student-name">
          <p className="student-name-header">Student Name : </p>
          <p className="student-name-value">{Studentname}</p>
        </div>
        <div className="student-rollno">
          <p className="student-rollno-header">Roll No :</p>
          <p className="student-rollno-value">{Studentrollno}</p>
        </div>
        <div className="student-uid">
          <p className="student-uid-header">U_ID :</p>
          <p className="student-uid-value">7127</p>
        </div>
      </div>
      <div className="admission-fees-container">
        <div className="admission-fees">
          <p className="admission-fees-header"> Admission Fees :</p>
          <p className="admission-fees-value"> ₹1500</p>
        </div>
        <div className="admission-fees-status">
          <p className="admission-style">
            Status:&nbsp;&nbsp;
            {isBoxVisible ? (
              <label className="admission-style-label">
                <input
                  name="example_1"
                  type="checkbox"
                  onClick={() => statusChangePaid()}
                />
                &nbsp;
                <span className="admission-boxsize">Mark as Paid.</span>
              </label>
            ) : null}
          </p>
          <p className={`admission-value-style ${Color}`}>{Admissionstatus}</p>
          {/* <Dropdown>
                            <Dropdown.Toggle variant={Color} className='admission-fees-status-style'  id="dropdown-basic">
                               Status : {Status}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className='admission-fees-status-style' onClick={statusChangePaid}>Paid</Dropdown.Item>
                                <Dropdown.Item className='admission-fees-status-style' onClick={statusChangeNotPaid}>Not Paid</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
        </div>
      </div>
      <div className="tution-fee-wrap">
        {showMonth.map((element, index) => (
          <Card element={element} id={index} />
        ))}
      </div>
    </div>
  );
}

export default Feeslog;
