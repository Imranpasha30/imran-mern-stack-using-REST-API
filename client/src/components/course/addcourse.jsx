import "./addcourse.css";
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
export const Course = () =>{
    

    const [course, setCourse] = useState({
        courseCode: "",
        courseName: "",
        section: "",
        semester: "",
      });

      const {id} = useParams();

      const [isAdmin, setIsAdmin] = useState(false);

      useEffect(() => {
        const fetchAdminStatus = async () => {
          try {
            const response = await fetch(`http://localhost:4000/api/auth/check-admin/${id}`);
            if (response.ok) {
              const data = await response.json();
              setIsAdmin(data.isAdmin || false);
            }
          } catch (error) {
            console.error("Error fetching admin status:", error);
          }
        };
    
        fetchAdminStatus();
      }, [id]);
    
      const handleInput = (e) => {
        console.log(e)
        let name=e.target.name;
        let value = e.target.value;
        setCourse({ ...course, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(course);
        try {
          const response = await fetch(`http://localhost:4000/api/auth/course/${id}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
          });
          console.log(id);
          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            alert("course added to ur bucket list");
            // Optionally, you can handle the response data or perform actions based on it.
           
          }
        } catch (error) {
          console.error("Error creating course:", error);
        }
      };
      const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page or any other desired page
        window.location.href = "/login";
      };

    return<> 
     <body className="coursebody">
    
  
    <section className="coursecontainer">
    <h1>Course Section</h1>
    <h2>Select Your Course</h2>
    
    <div className="container">
    <main>
        <div className="courseform">
            <h1 className="courseheadline">Course Form</h1>
            
            <form onSubmit={handleSubmit} >
            <div className='inputbox1'>
            <label htmlFor="courseCode" className="label1"></label>
                                <input type="text"
                                name="courseCode"
                                placeholder="Course Code" 
                                id="courseCode"
                                required
                                autoComplete="off"
                                className="custom-input"
                                value={course.courseCode}
                                onChange={handleInput}
                />
                 </div>
                 <div className='inputbox1'>
            <label htmlFor="courseName" className="label1"></label>
                                <input type="text"
                                name="courseName"
                                placeholder="Course Name" 
                                id="courseName"
                                required
                                autoComplete="off"
                                className="custom-input"
                                value={course.courseName}
                                onChange={handleInput}
                />
                 </div>
                 <div className='inputbox1'>
            <label htmlFor="section" className="label1"></label>
                                <input type="text"
                                name="section"
                                placeholder="Section" 
                                id="section"
                                required
                                autoComplete="off"
                                className="custom-input"
                                value={course.section}
                                onChange={handleInput}
                />
                 </div>
                 <div className='inputbox1'>
            <label htmlFor="Semester" className="label1"></label>
                                <input type="text"
                                name="semester"
                                placeholder="semester" 
                                id="semester"
                                required
                                autoComplete="off"
                                className="custom-input"
                                value={course.semester}
                                onChange={handleInput}
                />
                 </div>
                 <div>
                 <button type="submit" className="btn12 btn-submit">
                                Submit Now
                            </button>
                 </div>
                <div>
                 <Link to={`/usercourse/${id}`} className="btn13">Your Courses</Link>
                 {isAdmin && (
                      <Link to={`/admin`} className="btn13">
                        Admin Panel
                      </Link>
                    )}
</div>
{/* `/edit/`+user._id */}
<button onClick={handleLogout} className="btn14">
                      Logout
                    </button>
            </form>



        </div>


    </main>
    </div>


    </section>
    
    </body>

</>
};