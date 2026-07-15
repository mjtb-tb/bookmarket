import RegisterForm from "@/components/RegisterForm/RegisterForm";
import Head from "next/head";

export default function signUpForm(){
    return(
        <>
        <Head><title>ثبت نام</title></Head>
        <RegisterForm></RegisterForm>
        </>
    )
}