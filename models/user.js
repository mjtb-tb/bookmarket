const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        // minLength: 8,
        // maxLength:20,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book'
        }
    ],
    bookCount:{
        type:Number,
        required:true
    }
});

const usermodel = mongoose.models.User || mongoose.model('User',schema);
export default usermodel;