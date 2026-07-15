import usermodel from "@/models/user";
import bookmodel from "@/models/book";
import connectionDb from "@/functions/conecttionToDb";
import { verifyToken } from "@/functions/generateToken";

export default async function addToFavorites(req,res){
    connectionDb()

    if (req.method!='POST'){
        return false;
    }
    const {bookId} = req.body 
    const payLoadToken = verifyToken(req.cookies.bookmarketToken)
    const {username} = payLoadToken
    try{
        const updateduser = await usermodel.findOneAndUpdate(
            {username},
            {$addToSet:{wishlist:bookId}},
            { new: true } // این گزینه باعث می‌شود دیتای آپدیت شده برگردد
        ).populate("wishlist")
        return res.json({data:updateduser,error:false,message:' کتاب مورد نظر با موفقیت به لیست علاقه مندی ها اضافه شد '})

    }catch{
        return res.json({data:[],error:true,message:' خطا در اضافه کردن کتاب به لیست علاقه مندی ها '})

    }
}