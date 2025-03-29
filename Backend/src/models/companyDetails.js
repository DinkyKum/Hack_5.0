const mongoose= require('mongoose');
const validator= require('validator');


const companyDetailsSchema= new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
        minLength: 3,
    },

    logo:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid URL");
            }
        }
    },

    about:{
        type: String,
        required: true,
        minLength: 10,
    },

    contactNo:{
        type: Number,
        required: true,
        validate(value){
            if(!validator.isMobilePhone(value.toString())){
                throw new Error("Enter a valid Mobile Number");
            }
        }
    },

    address:{
        type: String,
        required: true,
    },

    registrationNo:{
        type: Number,
        required: true,
}
}
)

module.exports= mongoose.model('CompanyDetails', companyDetailsSchema);
