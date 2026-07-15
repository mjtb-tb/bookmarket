import { FaBook, FaUser, FaTags, FaExclamationTriangle, FaInfoCircle, FaBookmark } from 'react-icons/fa';
import styles from './Book.module.css';

export default function Book({ book, error, message }) {
  // مدیریت حالت خطا
  if (error) {
    return (
      <div className={styles.statusCard} style={{ '--accent-color': '#ff4d4d' }}>
        <FaExclamationTriangle className={styles.statusIcon} />
        <p className={styles.statusText}>{message || 'خطایی در بارگذاری اطلاعات کتاب رخ داده است.'}</p>
      </div>
    );
  }

  // مدیریت حالت خالی بودن یا نبودن کتاب
  if (!book) {
    return (
      <div className={styles.statusCard} style={{ '--accent-color': '#00d2ff' }}>
        <FaInfoCircle className={styles.statusIcon} />
        <p className={styles.statusText}>{message || 'کتابی پیدا نشد.'}</p>
      </div>
    );
  }

  return (
    <div className={styles.bookWrapper}>
      <div className={styles.bookCard}>
        
        {/* بخش کاور کتاب */}
        <div className={styles.coverSection}>
          <img 
            src={book.coverImg} 
            alt={book.bookname} 
            className={styles.coverImage} 
          />
          {/* نشانگر وضعیت کتاب (pending یا غیره) */}
          <span className={`${styles.badge} ${book.status === 'pending' ? styles.pending : styles.active}`}>
            {book.status === 'pending' ? 'در انتظار تایید' : 'تایید شده'}
          </span>
        </div>

        {/* بخش اطلاعات کتاب */}
        <div className={styles.detailsSection}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>
              <FaBook className={styles.titleIcon} /> {book.bookname}
            </h1>
            <p className={styles.author}>
              <FaUser className={styles.authorIcon} /> اثر {book.author}
            </p>
          </div>

          <div className={styles.metaTags}>
            <span className={styles.categoryTag}>
              <FaTags /> {book.category}
            </span>
            <span className={styles.labelTag}>
              <FaBookmark /> {book.bookLabel}
            </span>
          </div>

          {/* پلیر پخش کتاب صوتی */}
          <div className={styles.audioContainer}>
            <label className={styles.audioLabel}>شنیدن فایل صوتی کتاب:</label>
            <audio src={book.sound} controls className={styles.audioPlayer} />
          </div>
        </div>

      </div>
    </div>
  );
}