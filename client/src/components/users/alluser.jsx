import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "./alluser.css";
import { Link } from "react-router-dom";


export const Allusers = () =>{

    const[users,setUsers] = useState([]);

    useEffect( ()=>{
        const fetchData = async()=>{
         const response = await axios.get("http://localhost:4000/api/auth/getAll");
         setUsers(response.data);
        }

        fetchData();


    },[]);


    const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:4000/api/auth/deleteUser/${userId}`)
      .then((response)=>{
        setUsers((prevUser)=>prevUser.filter( (user) => user._id !== userId ))
        console.log(response)
        alert(response.data);

      }).catch((error)=>{
        console.log(error);
      })
    }

    return <>
        <div className="userTable">
    <Link to={"/addUser"} className="addbutton">+Add User</Link>
    <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>s.No.</th>
                <th>User name</th>
                <th>User Email</th>
                <th>Program</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}.</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.program}</td>
                <td className="actionbuttons">
                  <button onClick={()=> deleteUser(user._id)
                  
                  
                  
                  }>Delete</button>
                  <Link to={`/edit/`+user._id}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
    </table>



        </div>
   </>

};