import bookmodel from "@/models/book"
import Book from "@/components/Book/Book"
import connectionDb from "@/functions/conecttionToDb"
import Head from "next/head"

export async function getStaticProps(contex){
    await connectionDb()

    try{
        const book =  await bookmodel.findOne({_id:contex.params.book}) 
        return{
            props:{
                book:JSON.parse(JSON.stringify(book)),
                error:false,
                message:'ok'
            },
            revalidate:60
        }
    }catch{
        return{
            props:{
                book:[],
                error:true,
                message:' مشکلی وجود دارد '
            },
            revalidate:60
        }
    }
    
}

export async function getStaticPaths(){
    await connectionDb()

    let allBooks = await bookmodel.find({})
    
    const allPaths = allBooks.map((b)=>{
        return{
            params:{book:String(b._id)}
        }
    })

    return {
        paths:allPaths,
        fallback:'blocking'
    }
}

export default function book({book,error,message}){
    return (
        <>  
        <Head>
            <title>کتاب</title>
        </Head>
            <Book book={book} error={error} message={message}></Book>
        </>
    )
}