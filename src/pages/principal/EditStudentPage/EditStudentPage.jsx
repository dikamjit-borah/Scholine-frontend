import { React, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";
import "./editStudentPage.scss";
import BASE_URL from "../../../utilities/constants";
import FormData from "form-data";
import loaderimg from "../../../assests/animation/loader.gif";

import axios from "axios";

import {generateError, generateSubmitMsg} from '../../../utilities/globalFunctions';

function EditStudentPage(prop) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [mainData, setMainData] = useState([]);
  const [submittingStatus, setsubmittingStatus] = useState("notSubmitted");
  const [isError, setIsError] = useState(false);

  const [{ doc1Name, doc1Url }, setDoc1] = useState({
    doc1Name: "NA",
    doc1Url: "NA",
  });
  const [{ doc2Name, doc2Url }, setDoc2] = useState({
    doc2Name: "NA",
    doc2Url: "NA",
  });
  const [{ doc3Name, doc3Url }, setDoc3] = useState({
    doc3Name: "NA",
    doc3Url: "NA",
  });
  const [{ doc4Name, doc4Url }, setDoc4] = useState({
    doc4Name: "NA",
    doc4Url: "NA",
  });

  

  const [{ alt, src }, setImg] = useState({
    src:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
    alt: "Upload an Image",
  });
  const [transferDetailData, setTransferDetailData] = useState([]);
  const [date_of_admission, setDate_of_admission] = useState();
  const [birth_date, setBirth_date] = useState();
  const [date_of_issue, setDate_of_issue] = useState();

  const [isTransferStudent, setIsTransferStudent] = useState(false);

  const [is_transferred_student, setIs_transferred_student] = useState(0);

  let dateOfIssueArr;

  async function updateStudentData(studentData) {
    let tempform = new FormData();


    //main+transfer Data
    tempform.append("studentData", JSON.stringify(studentData));

    //dp
    if (Object.keys(formData).length)
      tempform.append("file", formData.file, formData.fullFileName);



    const noOfDocuments = Object.keys(documents).length;

    Object.entries(documents).forEach(element => {
      console.log(element);
      tempform.append("file", element[1].file,  element[1].fullFileName);
    });



    await axios
      .post(`${BASE_URL}/students/update`, tempform, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${tempform.getBoundary}`,
        },
      })
      .then((response) => setsubmittingStatus("submitted"))
      .catch((err) => {
        setsubmittingStatus("notSubmitted");
        setIsError(true);
      });
    console.log(documents);
  }

  useEffect(() => {
    fetchData(prop.sid);
  }, []);

  const fetchData = async (id) => {
    const result = await axios(`${BASE_URL}/students/${id}`);
    console.log(result.data.mainData);
    setMainData(result.data.mainData);
    setTransferDetailData(result.data.transferDetailData);
    setIs_transferred_student(result.data.mainData.is_transferred_student);

    setImg({
      src: result.data.mainData.dp,
      alt: "displayPicture",
    });

    let dateOfAdmissionArr = result.data.mainData.date_of_admission
      .toString()
      .split("T");
    setDate_of_admission(dateOfAdmissionArr[0]);
    let birthDateArr = result.data.mainData.birth_date.toString().split("T");
    setBirth_date(birthDateArr[0]);

    if (result.data.mainData.is_transferred_student) {
      dateOfIssueArr = result.data.transferDetailData.date_of_issue
        .toString()
        .split("T");
      setDate_of_issue(dateOfIssueArr[0]);
    }

    if (result.data.mainData.doc1) {
      setDoc1({
        doc1Name: JSON.parse(result.data.mainData.doc1).name,
        doc1Url: JSON.parse(result.data.mainData.doc1).url,
      });
    }

    if (result.data.mainData.doc2) {
      setDoc2({
        doc2Name: JSON.parse(result.data.mainData.doc2).name,
        doc2Url: JSON.parse(result.data.mainData.doc2).url,
      });
    }

    if (result.data.mainData.doc3) {
      setDoc3({
        doc3Name: JSON.parse(result.data.mainData.doc3).name,
        doc3Url: JSON.parse(result.data.mainData.doc3).url,
      });
    }

    if (result.data.mainData.doc4) {
      setDoc4({
        doc4Name: JSON.parse(result.data.mainData.doc4).name,
        doc4Url: JSON.parse(result.data.mainData.doc4).url,
      });
    }

    // setData(result.data.mainData);
    // if (result.data.mainData.is_transferred_student === 1) {
    //   settransferData(result.data.transferDetailData);
    // }

    //console.log(result.data);
    setIsLoaded(true);
  };

  const [documents, setDocuments] = useState({});
  const [formData, setFormData] = useState({});
  const handleDoc = (e, id, name) => {
    let arr = documents;

    if (e.target.files[0]) {
      let fullFileName = "" + name + "." + e.target.files[0].name.split(".")[1];
      console.log(fullFileName);

      arr[id] = { file: e.target.files[0], fullFileName };
      setDocuments(arr);
      console.log(documents);
      console.log("yoyoyoy", Object.keys(documents).length);
    }
  };
  const handleImg = (e, name) => {
    //console.log(e.target.files[0]);
    if (e.target.files[0]) {
      let fullFileName = "" + name + "." + e.target.files[0].name.split(".")[1];
      console.log(e.target.files[0].name);
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
      });

      setFormData({
        file: e.target.files[0],
        fullFileName,
      });
    }
  };

  const [data, setData] = useState();
  const [imgSrc, setImgSrc] = useState(
    "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
  );

  const generateError = () => {
    // setTimeout(()=>{setIsError(false)},3000);
    let errorMsg = "Student Id cannot be similar";
    return (
      <div className="alert-error">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
           {errorMsg}
          </p>
        </Alert>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsError(false);
    setsubmittingStatus("submitting");
    let allFormData = {};
    let mainData = {};
    let transferDetailData = {};

    for (let i = 0; i < event.target.length; i++) {
      allFormData[event.target[i].id] = event.target[i].value;
    }

    allFormData = {
      ...allFormData,
      birth_date: new Date(allFormData["birth_date"]),
      date_of_admission: new Date(allFormData["date_of_admission"]),
    };

    //console.log({ allFormData: allFormData });

    // for (let i = 0; i < event.target.length; i++) {
    //   console.log(Object.keys( allFormData )[i]);
    // }

    let i = 0;
    for (i = 0; i < 21; i++) {
      mainData[event.target[i].id] = event.target[i].value;
    }
    if (Object.keys(formData).length)
    {
      let dp_url = `${BASE_URL}/images/${mainData["u_id"]}/${formData.fullFileName}`;
      mainData = { ...mainData, is_transferred_student, dp: dp_url };
    }
    

    Object.entries(documents).map(doc => {
      let docUrl = `${BASE_URL}/images/${mainData["u_id"]}/${doc[1].fullFileName}`;
      const docName = event.target[`doc${doc[0]}Name`].value;
      mainData = {
        ...mainData,
        [`doc${doc[0]}`]: JSON.stringify({ name: docName, url: docUrl }),
      };
    });
    // const doc1 = `${BASE_URL}/images/${mainData["u_id"]}/${documents[1].fullFileName}`;
    // const doc2 = `${BASE_URL}/images/${mainData["u_id"]}/${documents[2].fullFileName}`;
    // const doc3 = `${BASE_URL}/images/${mainData["u_id"]}/${documents[3].fullFileName}`;
    // const doc4 = `${BASE_URL}/images/${mainData["u_id"]}/${documents[4].fullFileName}`;

    mainData = { ...mainData, is_transferred_student};

    for (
      i = i + Object.keys(documents).length * 2;
      i < event.target.length;
      i++
    ) {
      transferDetailData[event.target[i].id] = event.target[i].value;
    }

    let sub1 = {};
    let sub2 = {};
    let sub3 = {};
    let sub4 = {};
    let sub5 = {};
    let sub6 = {};

    sub1["name"] = transferDetailData["sub1Name"];
    sub1["mark"] = transferDetailData["sub1Marks"];

    sub2["name"] = transferDetailData["sub2Name"];
    sub2["mark"] = transferDetailData["sub2Marks"];

    sub3["name"] = transferDetailData["sub3Name"];
    sub3["mark"] = transferDetailData["sub3Marks"];

    sub4["name"] = transferDetailData["sub4Name"];
    sub4["mark"] = transferDetailData["sub4Marks"];

    sub5["name"] = transferDetailData["sub5Name"];
    sub5["mark"] = transferDetailData["sub5Marks"];

    sub6["name"] = transferDetailData["sub6Name"];
    sub6["mark"] = transferDetailData["sub6Marks"];

    sub1 = JSON.stringify(sub1);
    sub2 = JSON.stringify(sub2);
    sub3 = JSON.stringify(sub3);
    sub4 = JSON.stringify(sub4);
    sub5 = JSON.stringify(sub5);
    sub6 = JSON.stringify(sub6);

    transferDetailData = {
      ...transferDetailData,
      student_id: mainData["u_id"],
      sub1,
      sub2,
      sub3,
      sub4,
      sub5,
      sub6,
    };

    let bothMainAndTransferData = {};
    bothMainAndTransferData["mainData"] = mainData;
    bothMainAndTransferData["transferDetailData"] = transferDetailData;

    console.log(bothMainAndTransferData);

    updateStudentData(bothMainAndTransferData);

    //postData("sdfdf");
  };
  if(!isLoaded)
    return <div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}><img style={{width: "10rem", height: "auto" }} src={loaderimg} alt="Loading..." /></div>;
  return (
    <div className="add-student-container">
      {isError ? generateError() : null}
      <div className="student-dp">
        {submittingStatus === "submitted" ? generateSubmitMsg("Student updated successfully") : null}

        <img src={src?src:"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"} alt={alt} className="form-img__img-preview" />
        <label htmlFor="photo" className="form-img__file-label"></label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="photo"
          className="visually-hidden"
          onChange={(e) => {
            handleImg(e, "displayPicture");
          }}
        />
      </div>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="multiFields">
          <Form.Group controlId="u_id" className="multiFieldsItem">
            <Form.Label className="formTitle">Student UID</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              //   placeholder={mainData.u_id}
              required="true"
              defaultValue={mainData.u_id}
            />
          </Form.Group>

          <Form.Group controlId="admission_no" className="multiFieldsItem">
            <Form.Label className="formTitle">Admission Number</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              //   placeholder={mainData.admission_no}
              required="true"
              defaultValue={mainData.admission_no}
            />
          </Form.Group>
          <Form.Group controlId="date_of_admission" className="multiFieldsItem">
            <Form.Label className="formTitle">Date of Admission</Form.Label>
            <Form.Control
              className="formInput"
              type="date"
              //   placeholder={mainData.date_of_admission}
              required="true"
              defaultValue={date_of_admission}
            />
          </Form.Group>
        </div>

        <Form.Group controlId="student_name">
          <Form.Label className="formTitle">Full Name</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            // placeholder={mainData.student_name}
            required="true"
            defaultValue={mainData.student_name}
          />
        </Form.Group>

        <div className="multiFields">
          <Form.Group controlId="class" className="multiFieldsItem">
            <Form.Label className="formTitle">Class</Form.Label>
            <Form.Control className="formInput" as="select">
              <option selected>{mainData.class}</option>
              <option>KG</option>
              <option>NUR</option>
              <option>PREP</option>
              <option>I</option>
              <option>II</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
              <option>V</option>
              <option>VI</option>
              <option>VII</option>
              <option>VIII</option>
              <option>IX</option>
              <option>X</option>
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
          <Form.Group controlId="roll_no" className="multiFieldsItem">
            <Form.Label className="formTitle">Roll Number</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              //   placeholder={mainData.roll_no}
              required="true"
              defaultValue={mainData.roll_no}
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="birth_date" className="multiFieldsItem">
            <Form.Label className="formTitle">Date of Birth</Form.Label>
            <Form.Control
              className="formInput"
              type="date"
              defaultValue={birth_date}
              required="true"
            />
          </Form.Group>
          <Form.Group controlId="gender" className="multiFieldsItem">
            <Form.Label className="formTitle">Gender</Form.Label>
            <Form.Control className="formInput" as="select">
              <option selected>{mainData.gender}</option>
              <option>MALE</option>
              <option>FEMALE</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="caste" className="multiFieldsItem">
            <Form.Label className="formTitle">Caste</Form.Label>
            <Form.Control className="formInput" as="select">
            <option selected>{mainData.caste}</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            
              </Form.Control>
          </Form.Group>
          <Form.Group controlId="religion" className="multiFieldsItem">
            <Form.Label className="formTitle">Religion</Form.Label>
            <Form.Control className="formInput" as="select">
            <option selected>{mainData.religion}</option>
              <option>Hindu</option>
              <option>Islam</option>
              <option>Christian</option>
              <option>Sikh</option>
              <option>Jain</option>
              <option>Buddhist</option>
              
            
              </Form.Control>
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="father_name" className="multiFieldsItem">
            <Form.Label className="formTitle">Father's Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.father_name}
              required="true"
              defaultValue={mainData.father_name}
            />
          </Form.Group>

          <Form.Group controlId="father_occupation" className="multiFieldsItem">
            <Form.Label className="formTitle">Father's Occupation</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.father_occupation}
              required="true"
              defaultValue={mainData.father_occupation}
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="mother_name" className="multiFieldsItem">
            <Form.Label className="formTitle">Mother's Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.mother_name}
              required="true"
              defaultValue={mainData.mother_name}
            />
          </Form.Group>

          <Form.Group controlId="mother_occupation" className="multiFieldsItem">
            <Form.Label className="formTitle">Mother's Occupation</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.mother_occupation}
              required="true"
              defaultValue={mainData.mother_occupation}
            />
          </Form.Group>
        </div>

        <Form.Group controlId="address">
          <Form.Label className="formTitle">Address</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            // placeholder={mainData.address}
            required="true"
            defaultValue={mainData.address}
          />
        </Form.Group>

        <div className="multiFields">
          <Form.Group controlId="state" className="multiFieldsItem">
            <Form.Label className="formTitle">State</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.state}
              required="true"
              defaultValue={mainData.state}
            />
          </Form.Group>

          <Form.Group controlId="district" className="multiFieldsItem">
            <Form.Label className="formTitle">District</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder={mainData.district}
              required="true"
              defaultValue={mainData.district}
            />
          </Form.Group>
          <Form.Group controlId="pin" className="multiFieldsItem">
            <Form.Label className="formTitle">PIN</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              //   placeholder={mainData.pin}
              required="true"
              defaultValue={mainData.pin}
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="contact_no_1" className="multiFieldsItem">
            <Form.Label className="formTitle">Contact Number 1</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.contact_no_1}
              required="true"
              defaultValue={mainData.contact_no_1}
              pattern="^(0|\+91)?[789]\d{9}$"
            />
          </Form.Group>

          <Form.Group controlId="contact_no_2" className="multiFieldsItem">
            <Form.Label className="formTitle">Contact Number 2</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              //   placeholder={mainData.contact_no_2}
              required="true"
              defaultValue={mainData.contact_no_2}
              pattern="^(0|\+91)?[789]\d{9}$"
            />
          </Form.Group>
        </div>
        {is_transferred_student ? (
          <div>
            <h1>
              <u>For Transferring Students</u>
            </h1>
            <div className="multiFields">
              <Form.Group
                controlId="last_attended_school"
                className="multiFieldsItem"
              >
                <Form.Label className="formTitle">
                  Last Attended School
                </Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                  required="true"
                  defaultValue={transferDetailData.last_attended_school}
                />
              </Form.Group>

              <Form.Group
                controlId="last_attended_class"
                className="multiFieldsItem"
              >
                <Form.Label className="formTitle">
                  Last Attended Class
                </Form.Label>
                <Form.Control className="formInput" as="select">
                  <option selected>
                    {transferDetailData.last_attended_class}
                  </option>
                  <option>KG</option>
                  <option>NUR</option>
                  <option>PREP</option>
                  <option>I</option>
                  <option>II</option>
                  <option>II</option>
                  <option>III</option>
                  <option>IV</option>
                  <option>V</option>
                  <option>VI</option>
                  <option>VII</option>
                  <option>VIII</option>
                  <option>IX</option>
                  <option>X</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                controlId="affiliated_to_college"
                className="multiFieldsItem"
              >
                <Form.Label className="formTitle">Affiliated to</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                  required="true"
                  defaultValue={transferDetailData.affiliated_to_college}
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group
                controlId="transfer_certificate_no"
                className="multiFieldsItem"
              >
                <Form.Label className="formTitle">
                  Transfer Certificate Number
                </Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                  required="true"
                  defaultValue={transferDetailData.transfer_certificate_no}
                />
              </Form.Group>

              <Form.Group controlId="date_of_issue" className="multiFieldsItem">
                <Form.Label className="formTitle">Date of Issue</Form.Label>
                <Form.Control
                  className="formInput"
                  type="date"
                  placeholder=""
                  required="true"
                  defaultValue={date_of_issue}
                />
              </Form.Group>
            </div>
            <h2>Marks of last attended class</h2>

            <div className="multiFields">
              {transferDetailData.sub1.name}
              <Form.Group controlId="sub1Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#1 Name</Form.Label>

                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                  defaultValue={JSON.parse(transferDetailData.sub1).name}
                />
              </Form.Group>

              <Form.Group controlId="sub1Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#1 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub1).mark}
                />
              </Form.Group>
            </div>
            <div className="multiFields">
              <Form.Group controlId="sub2Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#2 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  defaultValue={JSON.parse(transferDetailData.sub2).name}
                />
              </Form.Group>

              <Form.Group controlId="sub2Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#2 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub2).mark}
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub3Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#3 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  defaultValue={JSON.parse(transferDetailData.sub3).name}
                />
              </Form.Group>

              <Form.Group controlId="sub3Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#3 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub3).mark}
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub4Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#4 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  defaultValue={JSON.parse(transferDetailData.sub4).name}
                />
              </Form.Group>

              <Form.Group controlId="sub4Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#4 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub4).mark}
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub5Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#5 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  defaultValue={JSON.parse(transferDetailData.sub5).name}
                />
              </Form.Group>

              <Form.Group controlId="sub5Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#5 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub5).mark}
                />
              </Form.Group>
            </div>
            <div className="multiFields">
              <Form.Group controlId="sub6Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#6 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  defaultValue={JSON.parse(transferDetailData.sub6).name}
                />
              </Form.Group>

              <Form.Group controlId="sub6Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#6 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  defaultValue={JSON.parse(transferDetailData.sub6).mark}
                />
              </Form.Group>
            </div>
          </div>
        ) : null}

        <div className="upload-docs">
          <Form.Group controlId="doc1Name" className="multiFieldsItem">
            <Form.Label className="formTitle">Document#1 Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              defaultValue={doc1Name}
            />
            <p>
              Previous document
              <a href={doc1Url}>
                <p>{doc1Url}</p>
              </a>
            </p>
          </Form.Group>

          <Form.Group controlId="doc1Input" className="multiFieldsItem input">
            <input
              type="file"
              accept=".png, .jpg, .jpeg .pdf"
              id="doc1"
              className="visually-hidden"
              onChange={(e) => {
                handleDoc(e, 1, "doc1");
              }}
            />
          </Form.Group>

          <Form.Group controlId="doc2Name" className="multiFieldsItem">
            <Form.Label className="formTitle">Document#2 Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              defaultValue={doc2Name}
            />
            <p>
              Previous document
              <a href={doc2Url}>
                <p>{doc2Url}</p>
              </a>
            </p>
          </Form.Group>

          <Form.Group controlId="doc2Input" className="multiFieldsItem input">
            <input
              type="file"
              accept=".png, .jpg, .jpeg .pdf"
              id="doc2"
              className="visually-hidden"
              onChange={(e) => {
                handleDoc(e, 2, "doc2");
              }}
            />
          </Form.Group>

          <Form.Group controlId="doc3Name" className="multiFieldsItem">
            <Form.Label className="formTitle">Document#3 Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              defaultValue={doc3Name}
            />
            <p>
              Previous document
              <a href={doc3Url}>
                <p>{doc3Url}</p>
              </a>
            </p>
          </Form.Group>

          <Form.Group controlId="doc3Input" className="multiFieldsItem input">
            <input
              type="file"
              accept=".png, .jpg, .jpeg .pdf"
              id="doc3"
              className="visually-hidden"
              onChange={(e) => {
                handleDoc(e, 3, "doc3");
              }}
            />
          </Form.Group>

          <Form.Group controlId="doc4Name" className="multiFieldsItem">
            <Form.Label className="formTitle">Document#4 Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              defaultValue={doc4Name}
            />
            <p>
              Previous document
              <a href={doc4Url}>
                <p>{doc4Url}</p>
              </a>
            </p>
          </Form.Group>

          <Form.Group controlId="doc4Input" className="multiFieldsItem input">
            <input
              type="file"
              accept=".png, .jpg, .jpeg .pdf"
              id="doc4"
              className="visually-hidden"
              onChange={(e) => {
                handleDoc(e, 4, "doc4");
              }}
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="EditStudentPageBtn">
          Update Student
        </Button>
        {isError ? (
            generateError()
          ) : (
            <span>
              {submittingStatus === "notSubmitted" ? null : submittingStatus ===
                "submitting" ? (
                <img
                  style={{ width: "10rem", height: "auto" }}
                  src={loaderimg}
                  alt="Loading..."
                />
              ) : (
                "submitted"
              )}
            </span>
          )}
      </Form>
    </div>
  );
}

export default EditStudentPage;
