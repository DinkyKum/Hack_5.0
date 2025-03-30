const jwt=require('jsonwebtoken');
const Companies=require('../models/companies');
const Resolvers=require('../models/resolvers');
const Employee=require('../models/employees');

const companyAuth= async (req, res, next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).send("Kindly Login")
    }
    const decodedData=await jwt.verify(token, process.env.JWT_SECRET);
    const {_id}=decodedData;

    const company= await Companies.findById(_id);
    if(!company){
        throw new Error("Company not found");
    }
    req.company=company;
    next();
}
    catch(err){
        res.status(400).send("There is some error"+ err);
    }
}

const resolverAuth= async (req, res, next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).send("Kindly Login")
    }
    const decodedData=await jwt.verify(token, process.env.JWT_SECRET);
    const {_id}=decodedData;

    const resolver= await Resolvers.findById(_id);
    if(!admin){
        throw new Error("Resolver not found");
    }
    req.resolver=resolver;
    next();
}
    catch(err){
        res.status(400).send("There is some error"+ err);
    }
}

const employeeAuth= async (req, res, next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).send("Kindly Login")
    }
    const decodedData=await jwt.verify(token, process.env.JWT_SECRET);
    const {_id}=decodedData;

    const employee= await Employee.findById(_id);
    if(!trader){
        throw new Error("Trader not found");
    }
    req.employee=employee;
    next();
}
    catch(err){
        res.status(400).send("There is some error"+ err);
    }
}

module.exports={companyAuth, employeeAuth , resolverAuth};