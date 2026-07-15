import usermodel from "@/models/user";
import connectionDb from "@/functions/conecttionToDb";
import bookmodel from "@/models/book";
import { verifyToken } from "@/functions/generateToken";


export default async function getFavorites(req,res){
    await connectionDb()

    // if (req.method!='POST'){
    //     return false;
    // }
    let {bookmarketToken} = req.cookies
    console.log('token///==>',bookmarketToken)
    if(!bookmarketToken){
        return res.json({data:[],error:true,message:"there is a problem"})
    }
    let payLoadToken = verifyToken(bookmarketToken)
    let {username} = payLoadToken

    username = username.trim() 
    try{
        const userFavorites = await usermodel
                .findOne({ username })
                .select("wishlist -_id") // فقط ویزلیست را بیاور و آی‌دی خود کاربر را حذف کن
                .populate("wishlist")    // اطلاعات کامل کتاب‌های داخل ویزلیست را لود کن
                .lean();    
            // .populate("wishlist","-count")    //  اطلاعات کامل کتاب‌های داخل ویزلیست را لود کن البتهای جز چیزی که از آن منها شده

        return res.json({data:userFavorites,error:false,message:'everything is ok'})        
    }catch{
        return res.json({data:[],error:true,message:'خطا در دیافت اطلاعات'}) 
    }

}