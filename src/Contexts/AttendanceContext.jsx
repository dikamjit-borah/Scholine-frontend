import { useState, React, createContext } from "react";

export const attendanceContextVariable = createContext();
function AttendanceContext() {
 

  const dateState = useState();
  const classState = useState();
  const sectionState = useState();
  return <div></div>;
}

export default AttendanceContext;









import React, { createContext, useReducer, useState, useEffect} from 'react';
import { auth } from '../config/firebase';




export const UsersContext = createContext();

const UsersContextProvider = (props) => {
    const [userInputData,setUserInputData] = useState({});
    const [userDetailData,setUserDetailData]= useState({});
    const [foundUsers,setFoundUsers] = useState([]);


    const refreshData = () => {
        if(userInputData.type=== "phoneNo")
            searchUserBYPhone(userInputData.data).then((snapshot)=>
                setFoundUsers(Object.values( snapshot))
            )

        else if(userInputData.type=== "userName")
            searchUserBYName(userInputData.data).then((snapshot)=>
            setFoundUsers(Object.values( snapshot))
        )

        else if(userInputData.type=== "userEmail")
           searchUserBYEmail(userInputData.data).then((snapshot)=>
           setFoundUsers(Object.values( snapshot))
       )

    }
    const searchUserBYPhone =async number => {
        let data;
        await auth.currentUser.getIdToken(true).then(async (idToken) =>{
            await fetch('http://localhost:3001/searchUserBYPhone',{
                method: 'POST',
                body: JSON.stringify({number}),  
                headers: {
                      'Authorization': `bearer ${idToken}`,
                      'Content-Type': 'application/json'
                    }
            })
            .then(res=> res.json())
            .then(snapshot=>{
                console.log(snapshot)
                data=snapshot;
            });
        });

        return new Promise((resolve,reject)=>{
            resolve(data);
        })
    } 
    const searchUserBYName =async name => {
        let data;
        await auth.currentUser.getIdToken(true).then(async (idToken) =>{
            await fetch('http://localhost:3001/searchUserBYName',{
                method: 'POST',
                body: JSON.stringify({name}),  
                headers: {
                      'Authorization': `bearer ${idToken}`,
                      'Content-Type': 'application/json'
                    }
            })
            .then(res=> res.json())
            .then(snapshot=>{
                console.log(snapshot)
                data=snapshot;
            });
        });

        return new Promise((resolve,reject)=>{
            resolve(data);
        });
    }

    const searchUserBYEmail =async email => {
        let data;
        await auth.currentUser.getIdToken(true).then(async (idToken) =>{
            await fetch('http://localhost:3001/searchUserBYEmail',{
                method: 'POST',
                body: JSON.stringify({email}),  
                headers: {
                      'Authorization': `bearer ${idToken}`,
                      'Content-Type': 'application/json'
                    }
            })
            .then(res=> res.json())
            .then(snapshot=>{
                console.log(snapshot)
                data=snapshot;
            });
        });

        return new Promise((resolve,reject)=>{
            resolve(data);
        });
    }


    const handleOwnerStatusChange =async (userId,selectedOwnerStatus)=> {
        return new Promise((resolve, reject) => {
            auth.currentUser.getIdToken(true).then( idToken =>{
                fetch('http://localhost:3001/modifyUserData',{
                    method: 'POST',
                    body: JSON.stringify({userId,selectedOwnerStatus}),  
                    headers: {
                          'Authorization': `bearer ${idToken}`,
                          'Content-Type': 'application/json'
                        }
                })
                .then(res=> res.status===200 ? resolve("Done"):reject("err"));
            });

        }); 
    }; 
 
    return (
        <UsersContext.Provider value={{ searchUserBYPhone,
                                        searchUserBYName,
                                        searchUserBYEmail,
                                        handleOwnerStatusChange,
                                        setUserInputData,
                                        setFoundUsers,
                                        foundUsers,
                                                                setUserDetailData,
                                                                userDetailData,
                                                                refreshData }}>
            {props.children}
        </UsersContext.Provider>
    );
};


export default UsersContextProvider;
