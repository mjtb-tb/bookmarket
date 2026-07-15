import Landing from "@/components/Landing/Landing"
import BooksContainer from "@/components/BooksContainer/BooksContainer"
import connectionDb from "@/functions/conecttionToDb"
import bookmodel from "@/models/book"
import Head from "next/head"


export async function getStaticProps(){
  await connectionDb()

  try{
    const books = await bookmodel.find({status:"confirmed"})
    console.log(books)
    console.log(typeof(books))
    let data = JSON.parse(JSON.stringify(books))
        return {
        props:{
            data,
            error:false,
            message:" everything is ok",
            title:' همه کتاب ها '
        }
    }


  }catch{
        return {
        props:{
            data:[],
            error:true,
            message:" there is a problem",
            title:' کتابی دریافت نشد'
        }
    }
  }
    
}

export default function home({data,error,message,title}){


    return(
        <>
            <Head>
                <title>home</title>
            </Head>

            <Landing></Landing>
            <BooksContainer data={data} error={error} message={message} title={title} ></BooksContainer>
        </>
    )
}