import { verifyToken } from "@/functions/generateToken";

export default function handler(req, res) {

    
  const token = req.cookies.bookmarketToken;
  if (!token) {
    return res.status(401).json({ isLoggedIn: false });
  }
  let payLoadToken = verifyToken(token)
  let {username} = payLoadToken
  let {role} = payLoadToken
  console.log('username==>',username)
  return res.status(200).json({ isLoggedIn: true ,username ,role});
}