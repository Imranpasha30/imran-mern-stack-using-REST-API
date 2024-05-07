import "./updateuser.css" ;
import { Link ,Navigate,useNavigate,useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Updateuser = () =>{

const users ={
    firstname:"",
        lastname:"",
        email: "",
        address:"",
        city:"",
        phonenumber:"",
        program:"*******",
        feedback:"",
}

const navigate = useNavigate()

const {id} = useParams();
const[user,setUser]=useState(users);

const inputChangeHandler = (e)=>{
    const{name,value}=e.target;
    setUser({...user,[name]:value});
    console.log(user);
}


useEffect(()=>{
axios.get(`http://localhost:4000/api/auth/getOne/${id}`)
.then((response)=>{
setUser(response.data)
})
.catch((error)=>{
    console.log(error);
})
    
},[id])

const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/auth/update/${id}`,user)
    .then((response)=>{
        alert("updated");
        navigate("/admin")
    
    })
    .catch(error=>console.log(error))

}
    
     return <>
    <div className='addUser'>
       
    </div>
    <body className="Add-user">
    
    <section className="conadduser">
        <main>
            <div className="section-registration">
                <div className="container ">
                     <Link to={"/admin"} className='adduser'>Back</Link>
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Update User</h1>
                        <form onSubmit={submitForm}>
                            <div className='inputbox'>
                                <label htmlFor="firstname"></label>
                                <input type="text"
                                value={user.firstname}
                                name="firstname"
                                placeholder="First Name" 
                                id="firstname"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}

                              
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="lastname"></label>
                                <input type="text"
                                value={user.lastname}
                                name="lastname"
                                placeholder="Last Name" 
                                id="lastname"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                                
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="email"></label>
                                <input type="text"
                                value={user.email}
                                name="email"
                                placeholder="Email" 
                                id="email"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                               
                                
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="address"></label>
                                <input type="text"
                                value={user.address}
                                name="address"
                                placeholder="address" 
                                id="address"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                                
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="city"></label>
                                <input type="text"
                                value={user.city}
                                name="city"
                                placeholder="city" 
                                id="city"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                                
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="phonenumber"></label>
                                <input type="number"
                                value={user.phonenumber}
                                name="phonenumber"
                                placeholder="Phone number" 
                                id="phonenumber"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                                
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="password"></label>
                                <input type="password"
                                value={user.password}
                                name="password"
                                placeholder="password" 
                                id="password"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                               
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="program"></label>
                                <input type="text"
                                value={user.program}
                                name="program"
                                placeholder="program" 
                                id="program"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                              
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="feedback"></label>
                                <input type="text-box"
                                value={user.feedback}
                                name="feedback"
                                placeholder="favourite or hobby" 
                                id="feedback"
                                required
                                autoComplete="off"
                                onChange={inputChangeHandler}
                                
                                />
                            </div>
                           
                            <br />
                            

                            <button type="submit" className="btn btn-submit">
                                Update
                            </button>
                        </form>
                    </div>


                </div>

            </div>
        </main>
    </section>
    </body>
    
    </>

};