import usermodel from "@/models/user";
import connectionDb from "@/functions/conecttionToDb";
import { verifyToken } from "@/functions/generateToken";

export default async function removeFromFavorites(req, res) {
    // ۱. اطمینان از اتصال به دیتابیس
    await connectionDb();

    // ۲. بررسی متد درخواست (معمولاً برای حذف از DELETE یا POST استفاده می‌شود، اینجا با توجه به ساختار شما POST گذاشتم)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: true, message: "فقط متد POST مجاز است" });
    }

    try {
        const { bookId } = req.body;
        const token = req.cookies.bookmarketToken;

        // ۳. بررسی وجود توکن
        if (!token) {
            return res.status(401).json({ error: true, message: "لطفا ابتدا وارد حساب خود شوید" });
        }

        // ۴. وریفای کردن توکن و جلوگیری از کرش سرور
        const payLoadToken = verifyToken(token);
        if (!payLoadToken || !payLoadToken.username) {
            return res.status(401).json({ error: true, message: "توکن شما نامعتبر یا منقضی شده است" });
        }

        const { username } = payLoadToken;

        // ۵. استفاده از $pull برای حذف لایک کتاب از آرایه wishlist
        const updatedUser = await usermodel.findOneAndUpdate(
            { username },
            { $pull: { wishlist: bookId } }, // 🔴 تفاوت اصلی: $pull آیتم را حذف می‌کند
            { new: true }
        ).select("-password"); // عدم بازگرداندن پسورد برای امنیت بیشتر

        if (!updatedUser) {
            return res.status(404).json({ error: true, message: "کاربر یافت نشد" });
        }

        return res.status(200).json({
            data: updatedUser,
            error: false,
            message: 'کتاب مورد نظر با موفقیت از لیست علاقه‌مندی‌ها حذف شد'
        });

    } catch (err) {
        console.error("Error in removeFromFavorites:", err);
        return res.status(500).json({
            data: [],
            error: true,
            message: 'خطای داخلی سرور در حذف کتاب از لیست علاقه‌مندی‌ها'
        });
    }
}