import connectionDb from "@/functions/conecttionToDb";
import usermodel from "@/models/user";
import { hashPassword } from "@/functions/hashing";
import { generateToken } from "@/functions/generateToken";


export default async function createUser(req,res){
  console.log( 'method ==>' , req.method)
  await connectionDb()

  if(req.method!='POST'){
    return;
  }
    try{
        const {username,password,firstname,lastname} = req.body
        const foundUser = await usermodel.findOne({username})
        console.log(foundUser)
        if(foundUser){
          return res.json({message:'there is a user with this username',error:true})
        }

        const usersCount = await usermodel.countDocuments({})
        
        const hashedPassword = await hashPassword(password)
        const user = await  usermodel.create({username,password:hashedPassword,firstname,lastname,role:(usersCount>0?"USER":"ADMIN"),bookCount:0})
        console.log(user)
        const token = generateToken({username,role:user.role})
        console.log(token)
        return res
          .setHeader(
            "Set-Cookie",
            `bookmarketToken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`
        ).json({message:' user was created successfuly',error:false,})
          
    }catch{
        return res.json({message:'there is a problem',error:true})
    }
}