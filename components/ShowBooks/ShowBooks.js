import BookItem from '../BookItem/BookItem';
import Link from 'next/link';
import { FaBook, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';
import styles from './ShowBooks.module.css';

export default function ShowBooks({ books, error, message }) {
  if (error) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.errorBox}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <h3>خطایی رخ داده است</h3>
          <p>{message || 'دریافت اطلاعات کتاب‌ها با مشکل مواجه شد.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      
      {/* دکمه بازگشت مستقل بالای جدول */}
      <div className={styles.backButtonWrapper}>
        <Link href="/home" className={styles.backHomeBtn}>
          <FaArrowRight className={styles.btnIcon} />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>

      {/* هدر بخش کتاب‌ها */}
      <div className={styles.tableHeader}>
        <FaBook className={styles.headerIcon} />
        <h2 className={styles.tableTitle}>مدیریت <span className={styles.highlight}>کتاب‌ها</span></h2>
      </div>

      <div className={styles.responsiveWrapper}>
        <table className={styles.neonTable}>
          <thead>
            <tr>
              <th>نام لِبل</th>
              <th>نام کتاب</th>
              <th>نویسنده</th>
              <th>دسته بندی</th>
              <th>وضعیت</th>
              <th>عملیات</th> {/* ستون فیکس شده برای دکمه‌ها */}
            </tr>
          </thead>
          <tbody>
            {books && books.map((book) => (
              <BookItem 
                key={book._id || book.bookLabel} 
                _id={book._id} 
                bookLabel={book.bookLabel} 
                bookname={book.bookname} 
                author={book.author} 
                status={book.status} 
                category={book.category} 
                userId={book.userId}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}