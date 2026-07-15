import bookmodel from "@/models/book";
import connectionDb from "@/functions/conecttionToDb";

export default async function confirmBook(req,res){
    connectionDb()
    const {bookId} = req.body
    
    try{
        const response = await bookmodel.findOneAndUpdate(
            {_id:bookId},
            {
                $set:{
                    status:"confirmed",
                }
            }
        )

        return res.json({error:false,message:" کتاب مورد نظر تایید شد "})

    }catch{
        return res.json({error:true,message:" تایید کتاب  مورد نظر با خطا مواجه شد "}) 
    }
}