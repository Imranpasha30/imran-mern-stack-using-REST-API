const User = require("../models/user-model");
const Course = require("../models/course-model");
const bcrypt = require("bcryptjs");

const home = async(req,res)=>
{
try{
    res.
    status(200).
    send("welcome to the home page from router1234");
}catch(error){
    console.log(error);
}
}



const register = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, email, address, city, phonenumber, password, program, feedback } = req.body;

        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        
        try {
            const newUser = await User.create({ firstname, lastname, email, address, city, phonenumber, password, program, feedback});
            res.status(200).json({ message: "registration  successfully!",token:await newUser.generateToken(), userId:newUser._id.toString() }); //, data: newUser
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.code === 11000 && error.keyPattern.email) {
              return res.status(400).json({ msg: "Email already exists" });
            }
            // Handle specific errors here (e.g., validation errors, unique constraint violations)
            res.status(400).json({ msg: "Error creating user" }); // Adjust message based on error
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Internal server error" }); // Only send this for unexpected errors
    }
};

//login controle

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("Received email:", email); // Log received email
  
      // Check if user exists with the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        // User not found
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Found user, compare password
      const passwordMatch = await bcrypt.compare(password, user.password);
      const userId = user._id.toString();
      console.log("User ID:", userId);
      if (passwordMatch) {
        // Login successful
        res.status(200).json({ message: "Login successful!" ,
        token:await user.generateToken(),
         userId:userId});
      } else {
        // Incorrect password
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  // const user = async(req,res)=>{
  //   try{
  //     const userData = req.user;

  //   }
  // }

const getAll =async(req,res)=>{
  try{
    const userData = await User.find();
    if(!userData){
      return res.status(404).json({msg:"user data not found"});
    }
    res.status(200).json(userData);
    }catch (error){
      res.status(500).jason({error:error});
  }
}


const getOne = async(req,res)=>
{
  try{
    const id= req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    res.status(200).json(userExist);
  }catch(error){
    res.status(500).json({error:error});
  }
}

const update = async(req,res )=>{
  try{
    const id= req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: 'User does not exist' });
    }
    const  updatedData = await User.findByIdAndUpdate(id , req.body , {
 new:true });
 res.status(200).json({msg: "user updated"});
}catch(error){
  res.status(500).json({error:error});
}
}

const deleteUser = async(req,res) =>{
try{
  const id= req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: 'User does not exist' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json("Deleted Successfully");

}catch(error){
  res.status(500).json({error:error});
}
}

//create a course


const createCourse = async (req, res) => {
  try {
    const { courseCode, courseName, section, semester, students } = req.body;
    const currentUserId = req.params.id;
    
    console.log("Current User ID:", currentUserId);
    const newCourse = await Course.create({
      courseCode,
      courseName,
      section,
      semester,
      students: [currentUserId],
    });

    res.status(200).json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//drop a course


const dropCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log(courseId);
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//


const getUserById = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Return user details
      res.status(200).json(user);
  } catch (error) {
      console.error('Error getting user details:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
//get course of specific user 
const getUserCourses = async (req, res) => {
  try {
    const userId = req.params.id;
    const userCourses = await Course.find({ students: userId });
    res.status(200).json({ userCourses });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/auth-controller.js

const checkAdminStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    const isAdmin = user.isAdmin || false;

    // Return admin status
    res.status(200).json({ isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};












module.exports = {home , register,login , getAll,getOne,update,deleteUser,createCourse,dropCourse,getUserById,getUserCourses,checkAdminStatus};