import connectionDb from "@/functions/conecttionToDb";
import bookmodel from "@/models/book";
import usermodel from "@/models/user";


export default async function getAllBooks(req,res){
  console.log( 'method ==>' , req.method)
   await connectionDb()

  if(req.method!='GET'){
    return;
  }
  try{
    const books = await bookmodel.find({status:"confirmed"}).populate("userId")
    return res.json(books)

  }catch{
    return res.json({message:'there is a problem'})
  }
  
}