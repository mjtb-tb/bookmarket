import bookmodel from "@/models/book";
import usermodel from "@/models/category";
import connectionDb from "@/functions/conecttionToDb";

export default async function deleteBook(req,res){
    await connectionDb()
    const {bookId,userId} = req.body
    
    try{
        const response = await bookmodel.findOneAndDelete({_id:bookId})
        await usermodel.findOneAndUpdate(
            {_id:userId},
            { 
                $set: { 
                bookCount:0
                } 
            },
        )

        return res.json({error:false,message:" کتاب مورد نظر حذف شد "})

    }catch{
        return res.json({error:true,message:" حذف کتاب  مورد نظر با خطا مواجه شد "}) 
    }
}