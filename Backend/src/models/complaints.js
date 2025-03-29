const mongoose= require('mongoose');



const complaintsSchema= new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        requred: true,
        ref: 'Employees'
    },  

    subject:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        enum: ['Unresolved', 'Resolved', 'Under Review'],
        default: 'Unresolved'
    }
}
)


module.exports= mongoose.model('Complaints', complaintsSchema);
