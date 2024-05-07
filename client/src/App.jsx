import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import {Reg} from "./pages/reg/reg";
import {Login} from "./pages/log/login"
import {Adminpage} from "./pages/adminpage";
import { Demo } from "./pages/demo";
import { Allusers } from "./components/users/alluser";
import { Addusers } from "./components/addusers/adduser";
import { Updateuser } from "./components/updateuser/updateuser";
import { Course } from "./components/course/addcourse";
import { Usercourse } from "./components/course/usercourse";


const App=()=>{
  return <>
  <BrowserRouter>
  <Routes>
    


    <Route path="/" element={<Reg/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path = "/adminpage" element={<Adminpage/>} />
    <Route path="/demo" element={<Demo/>} />
    <Route path="/admin" element={<Allusers/>} />
    <Route path="/adduser" element={<Addusers/>} />
    <Route path="/edit/:id" element={<Updateuser/>}/>
    <Route path="/course/:id" element={<Course/>}/>
    <Route path="/usercourse/:id" element={<Usercourse/>}/>
    </Routes>

  </BrowserRouter>
  </> 
}

export default App
