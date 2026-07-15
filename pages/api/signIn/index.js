import connectionDb from "@/functions/conecttionToDb";
import usermodel from "@/models/user";
import { verifyPassword } from "@/functions/hashing";
import { generateToken } from "@/functions/generateToken";
import { use } from "react";
import { error } from "three";

export default async function signIn(req,res){
  console.log( 'method ==>' , req.method)
  await connectionDb()

  if(req.method!='POST'){
    return;
  }else{
    try{
        const {username,password} = req.body
        const user = await  usermodel.findOne({username})
            console.log(user)
        if(user){
            const veryfiedPassword = await verifyPassword(password,user.password)
            if(veryfiedPassword){
              const token = generateToken({username,role:user.role})
              return res
                .setHeader(
                  "Set-Cookie",
                  `bookmarketToken=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`
              ).json({message:'you was signed in successfuly',error:false,})
            // return res.json({message:'you was signed in successfuly'})
            }
        }
        return res.json({message:'نام کاربری یا رمز عبور اشتباه است', error:true} )
    }catch{
        return res.json({message:'there is a problem',error:true})
    }
  }
}