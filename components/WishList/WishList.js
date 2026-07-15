import React from 'react';
import BookBox from '../BookBox/BookBox';
import { FaHeartBroken, FaExclamationTriangle } from 'react-icons/fa';
import styles from './WishList.module.css';

const Wishlist = ({data,error,message }) => {
  // دیستراکچر کردن پراپ ورودی طبق ساختار شما
//   const { data, error, message } = response || {};
  const wishlist = data?.wishlist || [];

  // ۱. مدیریت وضعیت خطا (اگر سرور خطا فرستاده بود یا ریکوئست فیل شده بود)
  if (error) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.errorBox}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <h3>خطایی رخ داده است</h3>
          <p>{message || 'دریافت اطلاعات با مشکل مواجه شد.'}</p>
        </div>
      </div>
    );
  }

  // ۲. مدیریت وضعیت خالی بودن لیست علاقه‌مندی‌ها
  if (wishlist.length === 0) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.emptyBox}>
          <FaHeartBroken className={styles.emptyIcon} />
          <h3>لیست علاقه‌مندی‌های شما خالی است</h3>
          <p>هنوز کتابی را به این لیست اضافه نکرده‌اید.</p>
        </div>
      </div>
    );
  }

  // ۳. رندر کردن لیست کتاب‌ها در صورت وجود دیتا
  return (
    <div className={styles.wishlistContainer}>
      <h2 className={styles.pageTitle}>
        کتاب‌های <span className={styles.highlight}>مورد علاقه</span> شما
      </h2>
      
      <div className={styles.booksGrid}>
        {wishlist.map((book) => (
          <BookBox 
            key={book._id || book.bookLabel} // استفاده از آی‌دی مونگو یا لیبل به عنوان کلید یکتا
            bookname={book.bookname}
            author={book.author}
            category={book.category}
            // اگر بعداً خواستی عکس پویا باشه، می‌تونی کاور ایمیج رو هم به کامپوننت پاس بدی:
            // coverImg={book.coverImg} 
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;