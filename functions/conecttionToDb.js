const mongoose = require('mongoose');

export default async function connectionDb(req,res){
    try{
        if(mongoose.connections[0].readyState){

        }else{
            // await mongoose.connect('mongodb://127.0.0.1:27017/bookmarket')
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected!');
        }
    }catch(err){
        console.log('error')
        console.error(err)
    }
    
    //return res.json({message:'test text'})
}

