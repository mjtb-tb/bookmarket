import connectionDb from "@/functions/conecttionToDb";
import usermodel from "@/models/user";
import { verifyToken } from "@/functions/generateToken";
import Wishlist from "@/components/WishList/WishList";
import BooksContainer from "@/components/BooksContainer/BooksContainer";
import Head from "next/head";


export async function getServerSideProps(context){
    const {bookmarketToken} = context.req.cookies
    console.log('boookmarkettoken===>',bookmarketToken)
    connectionDb()
    if (!bookmarketToken) {
        return {
            redirect: {
                destination: "/logInForm",
            },
        };
    }

    let tokenPayLoad = verifyToken(bookmarketToken)
    console.log('toooooken==>',tokenPayLoad)
    let {username} = tokenPayLoad
    console.log('=======>',username)

    try{
        const userFavorites = await usermodel
                .findOne({ username })
                .select("wishlist -_id") // فقط ویزلیست را بیاور و آی‌دی خود کاربر را حذف کن
                .populate("wishlist")    // اطلاعات کامل کتاب‌های داخل ویزلیست را لود کن
                .lean();    
            // .populate("wishlist","-count")    //  اطلاعات کامل کتاب‌های داخل ویزلیست را لود کن البتهای جز چیزی که از آن منها شده

            return{
                props:{
                    data:JSON.parse(JSON.stringify(userFavorites)),
                    error:false,
                    message:"everything is ok"
                }
            }      
    }catch{
            return{
                props:{
                    data:[],
                    error:true,
                    message:" خطا در دیافت اطلاعات "
                }
            } 
    }

}

export default function favorites({data,error,message}){

    console.log('data==>',data)
    console.log(error)
    console.log(message)

    return(
        <>
            <Head><title> مورد علاقه ها </title></Head>
            <BooksContainer data={data.wishlist} error={error} message={message} title={' کتاب های مورد علاقه شما '}></BooksContainer>
            {/* <Wishlist data={data} error={error} message={message} ></Wishlist> */}
        </>
    )
}