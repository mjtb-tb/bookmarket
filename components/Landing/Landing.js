import FloatingLines from "@/functions/FloatingLines/FloatingLines";
import styles from './Landing.module.css'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landing(){
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [isAdmin , setIsAdmin] = useState(false)

    // ✅ ۱. تابع اصلی useEffect نباید async باشد
    useEffect(() => {
        // ✅ ۲. تابع async را داخل آن تعریف و بلافاصله اجرا می‌کنیم
        const checkAuth = async () => {
            try {
                const response = await fetch("/api/me");
                let data = await response.json();
                console.log(response);
                setIsLoggedIn(data.isLoggedIn);
                setIsAdmin(data.role)
            } catch (err) {
                console.error("خطا در سیستم احراز هویت:", err);
                setIsLoggedIn(false); // اصلاح متغیر تعریف‌نشده دیتا در کچ
            }
        };

        checkAuth();
    }, []); // آرایه وابستگی خالی

    return (
        <>
            <div className={styles.landing} style={{ width: '100%', height: '600px', position: 'relative'}}>
                <FloatingLines 
                    enabledWaves={["top","middle","bottom"]}
                    lineCount={8}
                    lineDistance={8}
                    bendRadius={8}
                    bendStrength={-2}
                    interactive
                    parallax={true}
                    animationSpeed={1}
                    gradientStart="#e945f5"
                    gradientMid="#6f6f6f"
                    gradientEnd="#6a6a6a"
                />
                <div className={styles.landing_nav}>
                    <div className={styles.landing_nav_content}>
                        <div className={styles.landing_nav_content_left}>
                            <Link href='/aboutUs'>
                            <div className={styles.landing_nav_content_left_aboutUs}>درباره ما</div>
                            </Link>
                        </div> 
                        <div className={styles.landing_nav_content_middle}></div>                                     
                        <div className={styles.landing_nav_content_right}>
                            {
                                !isLoggedIn ? (
                                    <>
                                        <Link href='/signUpForm'>
                                            <div className={styles.landing_nav_content_right_signup}>ثبت نام</div>
                                        </Link>
                                        {/* 🟢 ۳. قرار دادن یک روت معتبر مثل /login برای دکمه ورود */}
                                        <Link href='/logInForm'>
                                            <div className={styles.landing_nav_content_right_signin}>ورود</div>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href='/userPanel'>
                                            <div className={styles.landing_nav_content_right_userPanel}>پنل کاربری</div>
                                        </Link>
                                        {
                                        isAdmin=="ADMIN"?(
                                            <Link href='/adminDashboard'>
                                                <div className={styles.landing_nav_content_right_adminDashboard}> داشبورد ادمین</div>
                                            </Link>

                                        ):''
                                    }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.landing_webname}>
                    <div className={styles.landing_webname_content}>
                        <div className={styles.landing_webname_title}>
                            <h1 className={styles.landing_webname_title_text}>Bookmarket</h1>
                        </div>
                        <div className={styles.landing_webname_describtion}>
                            <div className={styles.landing_webname_describtion_text}> این سایت یک پروژه تمرینی برای دانلود و آپلود کتاب صوتی میباشد. امیدوارم که تجربه رضایت بخشی داشته باشید</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}