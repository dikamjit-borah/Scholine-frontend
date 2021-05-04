import { useState, React, createContext } from "react";

export const AttendanceContextVariable = createContext();
function AttendanceContextProvider(props) {

  
  const [value, setValue] = useState({date:"",class:"",section:""})

  return <AttendanceContextVariable.Provider value={{value, setValue}}>{props.children}</AttendanceContextVariable.Provider>;
}

export default AttendanceContextProvider;








