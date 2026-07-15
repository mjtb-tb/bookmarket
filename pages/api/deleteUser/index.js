import usermodel from "@/models/user";
import connectionDb from "@/functions/conecttionToDb";

export default async function deleteUser(req,res){
    await connectionDb()
    const {userId} = req.body
    
    try{
        const response = await usermodel.findOneAndDelete({_id:userId})

        return res.json({error:false,message:" کاربر مورد نظر حذف شد "})

    }catch{
        return res.json({error:true,message:" حذف کاربر  مورد نظر با خطا مواجه شد "}) 
    }
}