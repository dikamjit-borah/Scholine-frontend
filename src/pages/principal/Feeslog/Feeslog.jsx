import React, { useState, useEffect } from "react";
// import { Button, Dropdown, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";
import Card from "../../../Components/reusable/Tutionfee/Card";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./feeslog.scss";
import loaderimg from "../../../assests/animation/loader.gif";
import BASE_URL from "../../../utilities/constants";
import {
  generateError,
  generateSubmitMsg,
} from "../../../utilities/globalFunctions";

function Feeslog() {
  let defaultfeeValue = "";

  const [dataLength, setDataLength] = useState(0);
  const [Studentname, setStudentname] = useState(" ");
  const [Studentrollno, setStudentrollno] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [Fessstatus, setFessstatus] = useState([]);
  const [Admissionstatus, setAdmissionstatus] = useState(" "); // " "
  const [Color, setColor] = useState(" ");
  const [isBoxVisible, setisBoxVisible] = useState(true);
  const [loader, setloader] = useState(true);
  const [Notic, setNotic] = useState("");

  const [globalId, setGlobalId] = useState();

  const location = useLocation();

  const [isError, setIsError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    console.log(id);
    setGlobalId(id);
    const fetchData = async () => {
      axios(`${BASE_URL}/fees/${id}`).then((result) => {
        setData(result.data);
        setFessstatus(result.data.dataResponse.dues.monthly);
        console.log("result", result.data);
        setStudentname(result.data.dataResponse.studentName);
        setStudentrollno(result.data.dataResponse.studentRollNo);

        if (result.data.dataResponse.dues.admission == 1) {
          setAdmissionstatus("Paid");
          setisBoxVisible(false);
          setColor("statusvaluegreen");
        } else if (result.data.dataResponse.dues.admission == 0) {
          setAdmissionstatus("Not Paid");
          setisBoxVisible(true);
          setColor("statusvaluered");
        }
        //   setAdmissionstatus(result.data.dataResponse.dues.admission);
        setDataLength(result.data.length);
        setIsLoaded(true);
      }).catch((err) => {
        setIsError(true)
        setIsLoaded(true)

        
      });
    };

    fetchData();
  }, []);

  function generateTutionError(){
      setIsUpdateError(true)

      setErrorMessage("Could not update Tution fees")

  }

  console.log(Admissionstatus);

  // const [Status, setStatus] = useState(defaultAdmissionfeeValue);

  // let color = 'danger';
  const statusChangePaid = () => {
    setloader(false);
    let xx = {};
    // let data = {}
    // data["month"] = selectedMonth;
    let feesData = {};
    feesData["s_id"] = globalId;
    feesData["type"] = "admission";
    // feesData["data"] = data
    xx["feesData"] = feesData;

    console.log("Hello world");
    console.log(xx);

    axios
      .post(`${BASE_URL}/fees/update`, xx)
      .then((res) => {
        console.log(res.data);
        setloader(true);
        setAdmissionstatus("Paid");
        setisBoxVisible(false);
        setColor("statusvaluegreen");
        setNotic("Admission updated");
      })
      .catch((err) => {
        //setIsError(true)
        setIsUpdateError(true)
        setErrorMessage("Could not update Admission fees")
        setloader(true);
        console.log(err);
    
       
      });
  };

  // const fees = [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1];
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
  

  if (isLoaded)
    return (
<>
     {isError? generateError(): 
     
     
     <div className="feeslog-container">
              {isUpdateError?generateError(500, errorMessage):null}
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
         <p className="student-uid-value">{globalId}</p>
       </div>
     </div>
     <div className="admission-fees-container">
       <div className="admission-fees">
         <p className="admission-fees-header"> Admission Fees :</p>
         <p className="admission-fees-value">
           {" "}
           ₹ {data.dataResponse.classFeesDetails.admission}
         </p>
       </div>
       <div className="admission-fees-status">
         <p className="admission-style">
           Status:&nbsp;&nbsp;
           {isBoxVisible ? (
             <label className="admission-style-label">
               <input
                 name="example_1"
                 type="checkbox"
                 onClick={() => {
                   statusChangePaid();
                 }}
               />
               &nbsp;
               <span className="admission-boxsize">Mark as Paid.</span>
             </label>
           ) : null}
         </p>
         <div className="admission-fees-status-notification">
           <p className={`admission-value-style ${Color}`}>
             {Admissionstatus}
           </p>
           <p>
             {loader ? (
               <div className="loader-style"></div>
             ) : (
               <div
                 style={{
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <img
                   style={{ width: "5rem", height: "auto" }}
                   src={loaderimg}
                   alt="Loading..."
                 />
               </div>
             )}
           </p>
         </div>
       </div>
     </div>
     <div className="tution-fee-wrap">
       {showMonth.map((element, index) => (
         <Card
           element={element}
           id={index}
           sid={globalId}
           monthlyFee={data.dataResponse.classFeesDetails.monthly}
           tutionError = {generateTutionError}
         />
       ))}
     </div>
   </div>
     

     }
     </>
    );
  else
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

export default Feeslog;
