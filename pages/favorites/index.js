import connectionDb from "@/functions/conecttionToDb";
import usermodel from "@/models/user";
import { verifyToken } from "@/functions/generateToken";
import BooksContainer from "@/components/BooksContainer/BooksContainer";
import Head from "next/head";

export async function getServerSideProps(context) {
    const { bookmarketToken } = context.req.cookies;
    console.log('bookmarketToken ===>', bookmarketToken);

    await connectionDb();

    // ۱. اگر توکن کلاً وجود نداشت، ریدایرکت به لاگین
    if (!bookmarketToken) {
        return {
            redirect: {
                destination: "/logInForm",
                permanent: false,
            },
        };
    }

    try {
        // ۲. تایید توکن را به داخل try می‌آوریم تا در صورت خراب بودن توکن، سرور کرش نکند
        const tokenPayLoad = verifyToken(bookmarketToken);
        
        if (!tokenPayLoad || !tokenPayLoad.username) {
            throw new Error("توکن نامعتبر است");
        }

        const { username } = tokenPayLoad;
        console.log('Username =======>', username);

        const userFavorites = await usermodel
            .findOne({ username })
            .select("wishlist -_id")
            .populate("wishlist")
            .lean();

        // ۳. سوپاپ اطمینان: اگر کاربر پیدا نشد یا ویش‌لیست نداشت
        const wishlistData = userFavorites?.wishlist || [];

        return {
            props: {
                data: JSON.parse(JSON.stringify(wishlistData)), // فقط آرایه کتاب‌ها را می‌فرستیم تا کار فرانت راحت شود
                error: false,
                message: "اطلاعات با موفقیت دریافت شد"
            }
        };

    } catch (err) {
        console.error("Error in Favorites getServerSideProps:", err.message);
        
        // اگر مشکلی در دیتابیس یا توکن بود، به جای فرستادن دیتای خراب، کاربر را به لاگین هدایت می‌کنیم
        return {
            redirect: {
                destination: "/logInForm",
                permanent: false,
            },
        };
    }
}

export default function Favorites({ data, error, message }) {
    console.log('Favorites Data ==>', data);

    // ۴. اگر دیتایی وجود نداشت یا خطا رخ داده بود، پیام مناسب نشان داده شود و کرش نکند
    if (error || !data) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
                {message || "خطایی در بارگذاری لیست علاقه‌مندی‌ها رخ داده است."}
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>مورد علاقه‌ها</title>
            </Head>
            {/* ۵. حالا data خودش مستقیماً آرایه کتاب‌هاست و نیازی به data.wishlist نیست */}
            <BooksContainer 
                data={data} 
                error={error} 
                message={message} 
                title='کتاب‌های مورد علاقه شما' 
            />
        </>
    );
}