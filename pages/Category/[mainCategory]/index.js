import bookmodel from "@/models/book";
import connectionDb from "@/functions/conecttionToDb";
import BooksContainer from "@/components/BooksContainer/BooksContainer";
import Head from "next/head";

export async function getStaticProps(context){
    await connectionDb()
    try{
        const books = await bookmodel.find({category:context.params.mainCategory})
        return{
            props:{
                books:JSON.parse(JSON.stringify(books)),
                error:false,
                message:' ok ',
                title:context.params.mainCategory
            },
            revalidate:60
        }
    }catch{
        return{
            props:{
                books:JSON.parse(JSON.stringify(books)),
                error:true,
                message:' ok ',
                title:context.params.mainCategory
            },
            revalidate:60
        }  
    }
    

    
}

export async function getStaticPaths(){
    return {
        paths:[
            {params:{mainCategory:'space'}},
            {params:{mainCategory:'science'}},
            {params:{mainCategory:'motivational'}},
        ],
        fallback:false
    }
}

export default function mainCategory({books,error,message,title}){
    return (
        <>
            <Head><title></title></Head>
            <BooksContainer data={books} error={error} message={message} title={title}></BooksContainer>
        </>
    )

}