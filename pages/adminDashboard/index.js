import usermodel from "@/models/user";
import bookmodel from "@/models/book";
import ShowUsers from "@/components/ShowUsers/ShowUsers";
import connectionDb from "@/functions/conecttionToDb";
import { redirect } from "next/dist/server/api-utils";
import { verifyToken } from "@/functions/generateToken";
import { useEffect,useState } from "react";
import ShowBooks from "@/components/ShowBooks/ShowBooks";
import { Head } from "next/document";


export async function getServerSideProps(context){
    
    connectionDb()

    const {bookmarketToken} = context.req.cookies
    if(!bookmarketToken){
        return{
            redirect:{
                destination:'./logInForm'
            }            
        }
    }
    const payLoadToken = verifyToken(bookmarketToken)
    const userRole = payLoadToken.role
    if(userRole=="USER"){
        return{
            redirect:{
                destination:'/logInForm'
            }
        }
    }
    try{
        const usersRespone = await usermodel.find({}).select("-password")
        const booksResponse = await bookmodel.find({})
        return{
            props:{
                users:JSON.parse(JSON.stringify(usersRespone)),
                books:JSON.parse(JSON.stringify(booksResponse)),
                error:false,
                message:"  با موفقیت دریافت شدند "
            }
        }
    }catch(err){
        console.error(err)
        return{
            props:{
                users:[],
                books:[],
                error:true,
                message:" خطا در دریافت  "
            }
        }
    }
}

export default function adminDashboard({users,books,error,message}){
    const [receivedUsers,setReceivedUsers] = useState([])
    const [receivedBooks,setReceivedBooks] = useState([])
    const [selected,setSelected] = useState('books')

    useEffect(()=>{
        setReceivedUsers(users)
        setReceivedBooks(books)
    },[users,books])

    function clickHandler(s){
        if(s==="books"){
            setSelected("books")
        }else if(s==="users"){
            setSelected("users")
        }
    }

    if(selected==="books"){
        return (
  
            <div >
<div style={{
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  background: 'rgba(20, 22, 28, 0.4)',
  borderRadius: '12px',
  border: '1px solid rgba(0, 242, 254, 0.05)',
  backdropFilter: 'blur(8px)',
  direction: 'rtl',
  fontFamily: 'system-ui, -apple-system, sans-serif'
}}>
  
  {/* دکمه مدیریت کاربران */}
  <button 
    onClick={() => clickHandler("users")}
    style={{
      background: '#181a21',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      color: '#00f2fe',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
      e.currentTarget.style.color = '#000000';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#181a21';
      e.currentTarget.style.color = '#00f2fe';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }}
  >
    مدیریت کاربرها
  </button>

  {/* دکمه مدیریت کتاب‌ها */}
  <button 
    onClick={() => clickHandler("books")}
    style={{
      background: '#181a21',
      border: '1px solid rgba(157, 78, 221, 0.3)', // یک تم بنفش ملایم برای تنوع دکمه دوم
      color: '#b5179e',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #b5179e 0%, #7209b7 100%)';
      e.currentTarget.style.color = '#ffffff';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(181, 23, 158, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#181a21';
      e.currentTarget.style.color = '#b5179e';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }}
  >
    مدیریت کتاب‌ها
  </button>

</div>
                <ShowBooks  books={receivedBooks} error={error} message={message}></ShowBooks>
            </div>
 
        )
    }
    else if(selected==="users"){
        return(
            
            <div >
<div style={{
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  background: 'rgba(20, 22, 28, 0.4)',
  borderRadius: '12px',
  border: '1px solid rgba(0, 242, 254, 0.05)',
  backdropFilter: 'blur(8px)',
  direction: 'rtl',
  fontFamily: 'system-ui, -apple-system, sans-serif'
}}>
  
  {/* دکمه مدیریت کاربران */}
  <button 
    onClick={() => clickHandler("users")}
    style={{
      background: '#181a21',
      border: '1px solid rgba(0, 242, 254, 0.3)',
      color: '#00f2fe',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)';
      e.currentTarget.style.color = '#000000';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 242, 254, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#181a21';
      e.currentTarget.style.color = '#00f2fe';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }}
  >
    مدیریت کاربرها
  </button>

  {/* دکمه مدیریت کتاب‌ها */}
  <button 
    onClick={() => clickHandler("books")}
    style={{
      background: '#181a21',
      border: '1px solid rgba(157, 78, 221, 0.3)', // یک تم بنفش ملایم برای تنوع دکمه دوم
      color: '#b5179e',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      outline: 'none'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'linear-gradient(135deg, #b5179e 0%, #7209b7 100%)';
      e.currentTarget.style.color = '#ffffff';
      e.currentTarget.style.boxShadow = '0 0 15px rgba(181, 23, 158, 0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#181a21';
      e.currentTarget.style.color = '#b5179e';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    }}
  >
    مدیریت کتاب‌ها
  </button>

</div>
                <ShowUsers users={receivedUsers} error={error} message={message}></ShowUsers>
            </div>
        )        
    }

}