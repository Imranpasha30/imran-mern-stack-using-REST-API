const express = require('express')
const router = express.Router();
const {home , register,login , getAll,getOne,update,deleteUser,createCourse,dropCourse,getUserById,getUserCourses,checkAdminStatus} = require("../controller/auth-controller");
const signupSchema =require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");

router.route("/").get(home);
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(login);
router.route("/getAll").get(getAll);
router.route("/getOne/:id").get(getOne);
router.put('/update/:id', update);
router.delete("/deleteUser/:id", deleteUser);
router.delete('/dropcourse/:id', dropCourse);
// router.route("/update:id").put(update);
router.route("/course/:id").post(createCourse);
router.get('/check-admin/:id', checkAdminStatus)

router.get("/user/:id",getUserById);
router.get("/getcourse/:id" ,  getUserCourses);





module.exports = router;
