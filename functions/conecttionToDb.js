// const mongoose = require('mongoose');

// export default async function connectionDb(req,res){
//     try{
//         if(mongoose.connections[0].readyState){

//         }else{
//             // await mongoose.connect('mongodb://127.0.0.1:27017/bookmarket')
//             await mongoose.connect(process.env.MONGODB_URI);
//             console.log('Connected!');
//         }
//     }catch(err){
//         console.log('error')
//         console.error(err)
//     }
    
//     //return res.json({message:'test text'})
// }

const mongoose = require('mongoose');

export default async function connectionDb() {
    try {
        // ۱. اگر متصل بودیم، فوراً برگرد و کار را تمام کن (جلوگیری از کدهای اضافه)
        if (mongoose.connections[0].readyState) {
            return; 
        }

        // ۲. فرآیند اتصال جدید با محدودیت زمانی هوشمند
        await mongoose.connect(process.env.MONGODB_URI, {
            // اگر در ۵ ثانیه نتوانست متصل شود، سریع خطا دهد تا سرور فریز نشود
            serverSelectionTimeoutMS: 5000, 
        });

        console.log('Database Connected Successfully!');
    } catch (err) {
        console.error('Database connection error details:', err);
        // ارسال خطا به سمت بالا تا توابع getServerSideProps بفهمند دیتابیس قطع است
        throw new Error("اتصال به دیتابیس برقرار نشد"); 
    }
}
