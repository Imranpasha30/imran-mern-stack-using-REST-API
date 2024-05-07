const {z} = require("zod");

const signupSchema = z.object({
    firstname:z.string({
        required_error:"name is required"
    }).trim().min(3,{message:"name should be atlest 3character"}),
    
    lastname:z.string().optional(),
     email :z.string({
        required_error:"email is required"
    }).trim().email({message:"invalid email address"}).min(3,{message:"email should be atlest 3character"}),
     address:z.string({
        required_error:"address is required"
    }).trim().min(3,{message:"address should be atlest 3character"}),
     city : z.string({
        required_error:"city is required"
    }).trim().min(3,{message:"city should be atlest 3character"}),
     phonenumber :z.string({
        required_error:"phone number is required"
    }).trim().min(3,{message:"phone number should be  10character"}),
     password: z.string({
        required_error:"password is required"
    }).trim().min(6,{message:"password should be atlest 3character"}),
     program :z.string({
        required_error:"program is required"
    }).trim().min(3,{message:"program should be atlest 3character"}),
     feedback:z.string({
        required_error:"feedback is required"
    }).trim().min(3,{message:"feedback should be atlest 3character"}),
     
});

module.exports = signupSchema;