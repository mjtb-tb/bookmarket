import { FaUserCircle, FaUser, FaIdCard, FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';
import styles from './UserProfile.module.css';

export default function UserProfile({ username, firstname, lastname, onLogout, error, message }) {
  
  const handleLogoutClick = () => {
    const isConfirmed = window.confirm("آیا مایلید از حساب کاربری خود خارج شوید؟");
    if (isConfirmed && onLogout) {
      onLogout();
    }
  };

  // اگر خطا وجود داشته باشد، این باکس رندر می‌شود
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <h3 className={styles.errorTitle}>خطا در دریافت اطلاعات</h3>
        <p className={styles.errorMessage}>{message || 'بارگذاری مشخصات کاربری با خطا مواجه شد.'}</p>
      </div>
    );
  }

  // در صورت نبود خطا، کارت پروفایل نمایش داده می‌شود
  return (
    <div className={styles.profileContainer}>
      
      {/* هدر یا آواتار پنل کاربری */}
      <div className={styles.avatarWrapper}>
        <FaUserCircle className={styles.avatarIcon} />
        <h2 className={styles.profileTitle}>پنل <span className={styles.highlight}>کاربری</span></h2>
      </div>

      {/* بخش نمایش اطلاعات */}
      <div className={styles.infoWrapper}>
        
        <div className={styles.infoField}>
          <div className={styles.fieldLabel}>
            <FaIdCard className={styles.fieldIcon} />
            <span>نام:</span>
          </div>
          <div className={styles.fieldValue}>{firstname || 'ثبت نشده'}</div>
        </div>

        <div className={styles.infoField}>
          <div className={styles.fieldLabel}>
            <FaIdCard className={styles.fieldIcon} />
            <span>نام خانوادگی:</span>
          </div>
          <div className={styles.fieldValue}>{lastname || 'ثبت نشده'}</div>
        </div>

        <div className={styles.infoField}>
          <div className={styles.fieldLabel}>
            <FaUser className={styles.fieldIcon} />
            <span>نام کاربری:</span>
          </div>
          <div className={styles.fieldValue} style={{ direction: 'ltr' }}>
            {username}
          </div>
        </div>

      </div>

      {/* دکمه خروج از حساب */}
      {/* <button className={styles.logoutBtn} onClick={handleLogoutClick}>
        <FaSignOutAlt className={styles.logoutIcon} />
        <span>خروج از حساب کاربری</span>
      </button> */}

    </div>
  );
}