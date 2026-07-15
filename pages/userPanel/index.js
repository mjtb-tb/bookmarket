import { verifyToken } from "@/functions/generateToken"
import usermodel from "@/models/user"
import UserProfile from "@/components/UserProfile/UserProfile"
import connectionDb from "@/functions/conecttionToDb"
import AddBookForm from "@/components/AddBookForm/AddBookForm"
import Head from "next/head"

export async function getServerSideProps(context) {
    await connectionDb();
    
    const { bookmarketToken } = context.req.cookies;
    
    // اگر توکنی وجود نداشت، مستقیم ریدایرکت شود
    if (!bookmarketToken) {
        return {
            redirect: {
                destination: '/signUpForm', // ترجیحاً بدون نقطه شروع شود
                permanent: false,
            }
        };
    }

    try {
        // ۱. فرآیند تایید توکن را درون try قرار می‌دهیم تا اگر توکن نامعتبر بود کل سرور نخوابد
        const payLoad = verifyToken(bookmarketToken);
        
        if (!payLoad || !payLoad.username) {
            throw new Error("توکن نامعتبر است");
        }

        const { username } = payLoad;
        const userData = await usermodel.findOne({ username });

        if (!userData) {
            throw new Error("کاربری با این مشخصات یافت نشد");
        }

        return {
            props: {
                data: JSON.parse(JSON.stringify(userData)),
                error: false,
                message: 'اطلاعات با موفقیت دریافت شدند'
            }
        };

    } catch (err) {
        console.error("Error in getServerSideProps:", err.message);
        
        // اگر کاربر لاگین نبود یا مشکلی پیش آمد، او را دوباره به فرم ثبت‌نام هدایت می‌کنیم
        return {
            redirect: {
                destination: '/signUpForm',
                permanent: false,
            }
        };
    }
}

export default function UserPanel({ data, error, message }) {
    // ۲. سوپاپ اطمینان: اگر به هر دلیلی در فرانت‌اند دیتای کاربر هنوز نرسیده باشد، جلوی کرش را می‌گیریم
    if (!data) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
                در حال بارگذاری اطلاعات پنل کاربری...
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>پنل کاربری</title>
            </Head>
            {/* استفاده از Optional Chaining برای امنیت بیشتر در رندر */}
            <UserProfile 
                username={data?.username || ''} 
                firstname={data?.firstname || ''} 
                lastname={data?.lastname || ''} 
                message={message} 
                error={error} 
            />
            <AddBookForm id={data?._id} bookCount={data?.bookCount || 0} />
        </>
    );
}