const mongoose= require('mongoose');
const validator= require('validator');
const jwt=require('jsonwebtoken');
const bcrypt= require('bcrypt');

const employeesSchema= new mongoose.Schema({
    username:{ 
        type: String,
        required: true,
        minLength: 3,
    },


    emailId:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a valid Email Id");
            }
        }
    },

    password:{
        required: true,
        type: String,
        minLength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password");
            }
        }
    },
}
)

employeesSchema.methods.getJWT= async function(){
    const token= jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    return token;
}

employeesSchema.methods.validatePassword= async function(passwordInputByUser){
    const isPasswordValid= await bcrypt.compare(passwordInputByUser, this.password);
    return(isPasswordValid);
}

module.exports= mongoose.model('Employees', employeesSchema);
