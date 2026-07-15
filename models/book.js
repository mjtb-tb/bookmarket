const mongoose = require('mongoose');

const schema = mongoose.Schema({
    bookLabel:{
        type:String,
        required:true,
    },
    bookname: {
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
        // minLength: 8,
        // maxLength:20,
    },
    category:{
        type:String,
        required:true,
    },
    coverImg:{
        type:String,
        required:true,
    },
    sound:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
});

const bookmodel = mongoose.models.Book || mongoose.model('Book',schema);
export default bookmodel;