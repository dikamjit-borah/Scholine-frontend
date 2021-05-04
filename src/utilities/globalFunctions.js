import Alert from "react-bootstrap/Alert";

const generateError = (errorCode, errorMsg="Something is wrong") => {
    // setTimeout(()=>{setIsError(false)},3000);
    //let errorMsg = "Student Id cannot be similar";
  
    return (
      
      <div className="alert-error">
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
           {errorCode === 401 ? errorMsg = "Incorrect Credentials" : errorMsg}
          
          </p>
        </Alert>
      </div>
    );
  };

  const generateSubmitMsg = (msg) => {
    // setTimeout(()=>{setIsError(false)},3000);

    return (
      <div className="alert-submit">
        <Alert variant="success">
          <Alert.Heading>{msg}</Alert.Heading>
        </Alert>
      </div>
    );
  };


  export { generateError, generateSubmitMsg }