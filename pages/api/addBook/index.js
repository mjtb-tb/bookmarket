import connectionDb from "@/functions/conecttionToDb";
import bookmodel from "@/models/book";
import usermodel from "@/models/user";
import { use } from "react";

export default async function addBook(req,res){
  console.log( 'method ==>' , req.method)
  connectionDb()

  if(req.method!='POST'){
    return;
  }
  try{
    const {bookLabel,bookname,author,category,coverImg,sound,userId} = req.body
    const foundBook = await bookmodel.findOne({bookLabel})
    if(foundBook){
        return res.json({error:true,message:'there is a book with this bookLabel'})
    }
    const foundUser = await usermodel.findOne({_id:userId})
    if(foundUser.bookCount>=1){
      return res.json({error:true,message:'شما قبلا یک کتاب ثبت کرده اید'})
    }
    const book = await  bookmodel.create({bookLabel,bookname,author,category,coverImg,sound,status:"pending",userId})
    await usermodel.findOneAndUpdate(
      {_id:userId},
      {
        $set:{
          bookCount:1
        }        
      }
    )

    console.log(book)
    return res.json({error:false,message:' book was added successfuly'})
    }catch{
        return res.json({error:false,message:'there is a problem'})
    }
}
