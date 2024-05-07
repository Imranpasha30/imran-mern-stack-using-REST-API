import { useState } from "react";
import { useAuth } from "../../store/auth";

export const Reg = () =>{

    const[user,setUser] = useState({
        firstname:"",
        lastname:"",
        email: "",
        address:"",
        city:"",
        phonenumber:"",
        password: "",
        program:"",
        feedback:"",
    });
    

const {storeTokenInLS} = useAuth();

    const handleInput=(e)=>{
        console.log(e);
        let name=e.target.name;
        let value = e.target.value;
        setUser({...user,[name]:value,}) 
       // console.log("Name : ",
    };
//handelling the form submit
    const  handleSubmit = async (e) =>{
        e.preventDefault();
         console.log(user);
         try{
         const response = await fetch('http://localhost:4000/api/auth/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
             body:JSON.stringify(user),
         });
        if(response.ok){
            const res_data = await response.json();

            storeTokenInLS(res_data.token);
            console.log(res_data);
            alert("registration done");
           window.location.href="/Login"
           
        }

         console.log(response);
        }catch(error){
            console.log("register",error);
        }


    }

    return<> 
    <body className="registration-page">
    
    <section className="con">
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">registration form</h1>
                        <form onSubmit={handleSubmit} >
                            <div className='inputbox'>
                                <label htmlFor="firstname"></label>
                                <input type="text"
                                name="firstname"
                                placeholder="First Name" 
                                id="firstname"
                                required
                                autoComplete="off"
                                value={user.firstname}
                                onChange={handleInput}
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="lastname"></label>
                                <input type="text"
                                name="lastname"
                                placeholder="Last Name" 
                                id="lastname"
                                required
                                autoComplete="off"
                                value={user.lastname}
                                onChange={handleInput}
                                />
                            </div>
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
                                <label htmlFor="address"></label>
                                <input type="text"
                                name="address"
                                placeholder="address" 
                                id="address"
                                required
                                autoComplete="off"
                                value={user.address}
                                onChange={handleInput}
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="city"></label>
                                <input type="text"
                                name="city"
                                placeholder="city" 
                                id="city"
                                required
                                autoComplete="off"
                                value={user.city}
                                onChange={handleInput}
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="phonenumber"></label>
                                <input type="number"
                                name="phonenumber"
                                placeholder="Phone number" 
                                id="phonenumber"
                                required
                                autoComplete="off"
                                value={user.phone}
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
                            <div className='inputbox'>
                                <label htmlFor="program"></label>
                                <input type="text"
                                name="program"
                                placeholder="program" 
                                id="program"
                                required
                                autoComplete="off"
                                value={user.program}
                                onChange={handleInput}
                                />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor="feedback"></label>
                                <input type="text-box"
                                name="feedback"
                                placeholder="favourite or hobby" 
                                id="feedback"
                                required
                                autoComplete="off"
                                value={user.favourite}
                                onChange={handleInput}
                                />
                            </div>
                            <p>Already have an account? <a href="/Login">Click here </a>to log-in</p>
                            <br />
                            

                            <button type="submit" className="btn btn-submit">
                                Register Now
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