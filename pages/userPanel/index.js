import { verifyToken } from "@/functions/generateToken"
import usermodel from "@/models/user"
import UserProfile from "@/components/UserProfile/UserProfile"
import { userData } from "three/tsl"
import { ImOffice } from "react-icons/im"
import connectionDb from "@/functions/conecttionToDb"
import AddBookForm from "@/components/AddBookForm/AddBookForm"
import { redirect } from "next/dist/server/api-utils"
import Head from "next/head"


export async function  getServerSideProps(context){
    await connectionDb()
    const {bookmarketToken} = context.req.cookies
    if(!bookmarketToken){
        return{
            redirect:{
                destination:'./signUpForm'
            }
        }
    }
    const payLoad = verifyToken(bookmarketToken)
    const {username} = payLoad
    try{
        const userData = await usermodel.findOne({username})
        return {
            props:{
                data:JSON.parse(JSON.stringify(userData)),
                error:false,
                message:' اطلاعات با موفقیت دریافت شدند '
            }
        }

    }catch{
        return {
            props:{
                data:{},
                error:true,
                message:' خطا '
            }   
        }
    }
}
export default function userPanel({data,error,message}){
    return(
        <>
        <Head><title>پنل کاربری </title></Head>
        <UserProfile username={data.username} firstname={data.firstname} lastname={data.lastname} message={message} error={error}></UserProfile>
        <AddBookForm id={data._id} bookCount={data.bookCount}></AddBookForm>
        </>
    )
}