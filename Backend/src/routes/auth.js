const express= require('express');
const authRouter= express.Router();
const {validateSignupData}=require('../utils/validation');
const Companies = require('../models/companies');
const Employees = require('../models/employees');
const bcrypt = require('bcrypt');
const Resolvers = require('../models/resolvers');

authRouter.post('/signup/:userType', async (req, res)=>{
    try{
    const {userType}=req.params;
      if(userType!="company"  && userType!= "employee") throw new Error("Invalid User Type");

      let user=null;
        const {password}= req.body;
        const Hashpassword= await bcrypt.hash(password, 10);

        if(userType=="company"){
            const {name, emailId}= req.body;
            validateSignupData(req);
            const company= new Companies({
                name, emailId, password:Hashpassword
            });
            user=company;
            await company.save();
        }

      else if(userType=="employee") {
        const {name, emailId}= req.body;
        validateSignupData(req);
    
        const employee= new Employees({
           username:name, emailId, password:Hashpassword
        });
        user=employee;
        await employee.save();
      }

      if(user){
        const token= await user.getJWT();
        res.cookie("token", token);
        res.json({message: `${userType} Added Successfully`, data:user})
      }
     } 
  
     catch(err){
      res.status(400).send("There is an error" + err);
     }
  })

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;

        let user = await Companies.findOne({ emailId });

        if (!user) {
            user = await Employees.findOne({ emailId });
        }
        if (!user) {
            user = await Resolvers.findOne({ emailId });
        }
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,  
                sameSite: "none",  
            });

            return res.json(user);
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error("Login Error:", err);  // Debugging log
        res.status(400).json({ message: "There is some error", error: err.message });
    }
});

authRouter.post('/logout', async(req, res)=>{
    res.cookie("token", null, {expires: new Date(Date.now())});
    res.send("LoggedOut Successfully");
});

module.exports= authRouter;