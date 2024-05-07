import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import "./alluser.css";

export const Usercourse = () => {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/auth/getcourse/${id}`);
        setUsers(response.data.userCourses || []);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchData();
  }, [id]);

  const usercourse = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/dropcourse/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("Course deleted successfully");
      // You may want to show a success message or update UI accordingly
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <div className="userTable">
        <Link to={`/course/${id}`} className="addbutton">
          Back
        </Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>s.No.</th>
              <th>Course code</th>
              <th>Course Name</th>
              <th>Section and Semester</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}.</td>
                <td>{user.courseCode}</td>
                <td>{user.courseName}</td>
                <td>{`'${user.section}'`} -{user.semester}</td>
                <td className="actionbuttons">
                  <button onClick={() => usercourse(user._id)}>Delete</button>
                  {/* <Link to={`/edit/`}>Edit</Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
