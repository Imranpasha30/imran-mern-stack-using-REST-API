import { useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from 'react-router-dom';
export const Login = () =>{

    const[user,setUser] = useState({
        email: "",
        password:"",
    });

    const {storeTokenInLS} = useAuth();
    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value,}) 
       // console.log("Name : ",
    };
    const  handleSubmit = async (e) =>{
        e.preventDefault();
        // console.log(user);
        try{
            const response = await fetch('http://localhost:4000/api/auth/login',{
               method:"POST",
               headers:{
                   'Content-Type':'application/json'
               },
                body:JSON.stringify(user),
            });
           if(response.ok){
              alert("LOGIN done");
              const res_data = await response.json();
            //   console.log(res_data);

              console.log("this is the token",res_data.token);
              storeTokenInLS(res_data.token);
              window.location.href=`/course/${res_data.userId}`;
              
              
            
           }}
           catch(error){
            //ccc
        }
    }

    return <>
    <body className="registration-page">
    <section className="con1">
        <main>
            <div className="section-registration1">
                <div className="container grid grid-two-cols">
                    
                    <div className="Login-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <form onSubmit={handleSubmit} >
                            
                           
                            <div className='inputbox'>
                                <label htmlFor="email"></label>
                                <input type="text"
                                name="email"
                                placeholder="Email" 
                                id="email"
                                required
                                autoComplete="off"
                                value={user.email}
                                onChange={handleInput}
                                />
                            </div>
                           
                            
                          
                            <div className='inputbox'>
                                <label htmlFor="password"></label>
                                <input type="password"
                                name="password"
                                placeholder="password" 
                                id="password"
                                required
                                autoComplete="off"
                                value={user.password}
                                onChange={handleInput}
                                />
                            </div>
                           
                            <p>Dont have an account? <a href="/">Click here to</a>Register</p>
                            <br />
                            

                            <button type="submit" className="btn btn-submit">
                                Login
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