const mongoose = require('mongoose');

const schema = mongoose.Schema({
    category: {
        type:String,
        required:true,
    },
    categoryText:{
        type:String,
        required:true
    }
});

const usermodel = mongoose.models.Category || mongoose.model('Category',schema);
export default usermodel;