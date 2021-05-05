import { React, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./addStudent.scss";
import BASE_URL from "../../../utilities/constants";
import FormData from "form-data";
import loaderimg from "../../../assests/animation/loader.gif";
import axios from "axios";


function AddStudent() {
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

  const [{ alt, src }, setImg] = useState({
    src:
      "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
    alt: "Upload an Image",
  });
  const [isError, setIsError] = useState(false);
  const [submittingStatus, setsubmittingStatus] = useState("notSubmitted");
  const [rb1ClassName, setRb1ClassName] = useState("rb-selected");
  const [rb2ClassName, setRb2ClassName] = useState("rb-not-selected");
  const [documents, setDocuments] = useState({});
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState();

  const handleDoc = (e, id, name) => {
    let arr = documents;

    if (e.target.files[0]) {
      let fullFileName = "" + name + "." + e.target.files[0].name.split(".")[1];
  

      arr[id] = { file: e.target.files[0], fullFileName };
      setDocuments(arr);
    }
  };

  const handleImg = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      
      if (file.size > 300000) {
        e.target.value = null;
        return alert("File Size is more than 300KB");
      }
      let fullFileName = "" + name + "." + e.target.files[0].name.split(".")[1];
      
      setImg({
        src: URL.createObjectURL(file),
        alt: file.name,
      });

      setFormData({
        file: file,
        fullFileName,
      });
    }
  };

  const [isTransferStudent, setIsTransferStudent] = useState(false);

  const [is_transferred_student, setIs_transferred_student] = useState(0);

  async function postData(studentData) {
    let tempform = new FormData();

    tempform.append("studentData", JSON.stringify(studentData));
    if (Object.keys(formData).length)
      tempform.append("file", formData.file, formData.fullFileName);

    const noOfDocuments = Object.keys(documents).length;

    for (let i = 1; i <= noOfDocuments; i++) {
      tempform.append("file", documents[i].file, documents[i].fullFileName);
    }

    await axios
      .post(`${BASE_URL}/students/add`, tempform, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem("token"),
          "Content-Type": `multipart/form-data; boundary=${tempform.getBoundary}`
        }
      })
      .then((response) => {
        setsubmittingStatus("submitted");
        // setTimeout(2000);

        // window.location.reload();
      })
      .catch((err) => {
        setsubmittingStatus("notSubmitted");
        setIsError(true);

        setErrorMsg(err.response.data.error.message)
      });
   
  }

  const generateError = (errorMsgParam) => {
    // setTimeout(()=>{setIsError(false)},3000);

    return (
      <div className="alert-error">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
           {errorMsgParam}
          </p>
        </Alert>
      </div>
    );
  };

  const generateSubmitMsg = () => {
    // setTimeout(()=>{setIsError(false)},3000);

    return (
      <div className="alert-submit">
        <Alert variant="success">
          <Alert.Heading>Student created successfully</Alert.Heading>
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

    let i = 0;
    for (i = 0; i < 21; i++) {
      mainData[event.target[i].id] = event.target[i].value;
    }

    if (Object.keys(formData).length) {
      let dp_url = `${BASE_URL}/images/${mainData["u_id"]}/${formData.fullFileName}`;
      mainData = { ...mainData, is_transferred_student, dp: dp_url };
    }

    Object.entries(documents).map((doc, i) => {
      let docUrl = `${BASE_URL}/images/${mainData["u_id"]}/${
        documents[doc[0]].fullFileName
      }`;
      const docName = event.target[`doc${i + 1}Name`].value;
      mainData = {
        ...mainData,
        [`doc${doc[0]}`]: JSON.stringify({ name: docName, url: docUrl }),
      };
    });

    mainData = { ...mainData, is_transferred_student };

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

    postData(bothMainAndTransferData);
  };

  return (
    <div className="add-student-container">
      {isError ? generateError(errorMsg) : null}
      <div className="student-dp">
        {submittingStatus === "submitted" ? generateSubmitMsg() : null}

        <img src={src} alt={alt} className="form-img__img-preview" />
        <label htmlFor="photo" className="form-img__file-label"></label>
        <input
          type="file"
          required={true}
          accept=".png, .jpg, .jpeg"
          id="photo"
          className="visually-hidden"
          onChange={(e) => {
            handleImg(e, "displayPicture");
          }}
        />
      </div>

      <div className="radioGroup">
        <ButtonGroup aria-label="Basic example" className="radioGroup">
          <Button
            variant="secondary"
            onClick={() => {
              setIs_transferred_student(0);
              setIsTransferStudent(false);
              setRb2ClassName("rb-not-selected");
              setRb1ClassName("rb-selected");
            }}
            className={`radioBtn ${rb1ClassName}`}
          >
            Existing Student
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              setIs_transferred_student(1);
              setIsTransferStudent(true);
              setRb1ClassName("rb-not-selected");
              setRb2ClassName("rb-selected");
            }}
            className={`radioBtn ${rb2ClassName}`}
          >
            Transferring Student
          </Button>
        </ButtonGroup>
      </div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="multiFields">
          <Form.Group controlId="u_id" className="multiFieldsItem">
            <Form.Label className="formTitle">Student UID</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              placeholder=""
              required="true"
            />
          </Form.Group>

          <Form.Group controlId="admission_no" className="multiFieldsItem">
            <Form.Label className="formTitle">Admission Number</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              placeholder=""
              required="true"
            />
          </Form.Group>
          <Form.Group controlId="date_of_admission" className="multiFieldsItem">
            <Form.Label className="formTitle">Date of Admission</Form.Label>
            <Form.Control
              className="formInput"
              type="date"
              placeholder=""
              required="true"
            />
          </Form.Group>
        </div>

        <Form.Group controlId="student_name">
          <Form.Label className="formTitle">Full Name</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            placeholder=""
            required="true"
          />
        </Form.Group>

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
          <Form.Group controlId="roll_no" className="multiFieldsItem">
            <Form.Label className="formTitle">Roll Number</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              placeholder=""
              required="true"
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="birth_date" className="multiFieldsItem">
            <Form.Label className="formTitle">Date of Birth</Form.Label>
            <Form.Control
              className="formInput"
              type="date"
              placeholder=""
              required="true"
            />
          </Form.Group>
          <Form.Group controlId="gender" className="multiFieldsItem">
            <Form.Label className="formTitle">Gender</Form.Label>
            <Form.Control className="formInput" as="select">
              <option>MALE</option>
              <option>FEMALE</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="caste" className="multiFieldsItem">
            <Form.Label className="formTitle">Caste</Form.Label>
            <Form.Control className="formInput" as="select">
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
            
              </Form.Control>
          </Form.Group>
          <Form.Group controlId="religion" className="multiFieldsItem">
            <Form.Label className="formTitle">Religion</Form.Label>
            <Form.Control className="formInput" as="select">
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
              placeholder=""
              required="true"
            />
          </Form.Group>

          <Form.Group controlId="father_occupation" className="multiFieldsItem">
            <Form.Label className="formTitle">Father's Occupation</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="mother_name" className="multiFieldsItem">
            <Form.Label className="formTitle">Mother's Name</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
            />
          </Form.Group>

          <Form.Group controlId="mother_occupation" className="multiFieldsItem">
            <Form.Label className="formTitle">Mother's Occupation</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
            />
          </Form.Group>
        </div>

        <Form.Group controlId="address">
          <Form.Label className="formTitle">Address</Form.Label>
          <Form.Control
            className="formInput"
            type="text"
            placeholder=""
            required="true"
          />
        </Form.Group>

        <div className="multiFields">
          <Form.Group controlId="state" className="multiFieldsItem">
            <Form.Label className="formTitle">State</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
            />
          </Form.Group>

          <Form.Group controlId="district" className="multiFieldsItem">
            <Form.Label className="formTitle">District</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
            />
          </Form.Group>
          <Form.Group controlId="pin" className="multiFieldsItem">
            <Form.Label className="formTitle">PIN</Form.Label>
            <Form.Control
              className="formInput"
              type="number"
              placeholder=""
              required="true"
            />
          </Form.Group>
        </div>

        <div className="multiFields">
          <Form.Group controlId="contact_no_1" className="multiFieldsItem">
            <Form.Label className="formTitle">Contact Number 1</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
              pattern="^(0|\+91)?[789]\d{9}$"

            />
          </Form.Group>

          <Form.Group controlId="contact_no_2" className="multiFieldsItem">
            <Form.Label className="formTitle">Contact Number 2</Form.Label>
            <Form.Control
              className="formInput"
              type="text"
              placeholder=""
              required="true"
              pattern="^(0|\+91)?[789]\d{9}$"

            />
          </Form.Group>
        </div>

        {isTransferStudent ? (
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
                  {classes.map((element) => {
                    return <option>{element}</option>;
                  })}
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
                />
              </Form.Group>

              <Form.Group controlId="date_of_issue" className="multiFieldsItem">
                <Form.Label className="formTitle">Date of Issue</Form.Label>
                <Form.Control
                  className="formInput"
                  type="date"
                  placeholder=""
                  required="true"
                />
              </Form.Group>
            </div>
            <h2>Marks of last attended class</h2>
            <div className="multiFields">
              <Form.Group controlId="sub1Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#1 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub1Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#1 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>
            <div className="multiFields">
              <Form.Group controlId="sub2Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#2 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub2Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#2 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub3Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#3 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub3Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#3 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub4Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#4 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub4Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#4 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>

            <div className="multiFields">
              <Form.Group controlId="sub5Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#5 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub5Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#5 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>
            <div className="multiFields">
              <Form.Group controlId="sub6Name" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#6 Name</Form.Label>
                <Form.Control
                  className="formInput"
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="sub6Marks" className="multiFieldsItem">
                <Form.Label className="formTitle">Subject#6 Marks</Form.Label>
                <Form.Control
                  className="formInput"
                  type="number"
                  placeholder=""
                />
              </Form.Group>
            </div>
          </div>
        ) : null}

        <div className="upload-docs">
          <Form.Group controlId="doc1Name" className="multiFieldsItem">
            <Form.Label className="formTitle">Document#1 Name</Form.Label>
            <Form.Control className="formInput" type="text" placeholder="" />
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
            <Form.Control className="formInput" type="text" placeholder="" />
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
            <Form.Control className="formInput" type="text" placeholder="" />
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
            <Form.Control className="formInput" type="text" placeholder="" />
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

        <div className="submitting-status">
          <Button variant="primary" type="submit" className="addStudentBtn">
            Add Student
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
                <>
                  <Toast>
                    <Toast.Header>
                      <strong className="mr-auto">Just Now</strong>
                    </Toast.Header>
                    <Toast.Body>Student created!</Toast.Body>
                  </Toast>
                </>
              )}
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}

export default AddStudent;
