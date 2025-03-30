const mongoose= require('mongoose');
const validator= require('validator');
const jwt=require('jsonwebtoken');
const bcrypt= require('bcrypt');

const companiesSchema= new mongoose.Schema({
    name:{ 
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

    companyDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "CompanyDetails",
    },

    complaints:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaints",
    },

    resolvers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resolvers",
    },

    employees:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Employees",
    },

    uniquekey:{
        type: String,
        unique: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Key");
            }
        }
    },
}
)

companiesSchema.methods.getJWT= async function(){
    const token= jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    return token;
}

companiesSchema.methods.validatePassword= async function(passwordInputByUser){
    const isPasswordValid= await bcrypt.compare(passwordInputByUser, this.password);
    return(isPasswordValid);
}

module.exports= mongoose.model('Companies', companiesSchema);
