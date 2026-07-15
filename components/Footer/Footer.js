import React from 'react';
import Link from 'next/link'; // اگر از React Router استفاده می‌کنی این خط رو به این تغییر بده: import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaBookOpen } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.neonFooter}>
      <div className={styles.footerContainer}>
        
        {/* بخش اول: درباره پروژه */}
        <div className={styles.footerInfo}>
          <div className={styles.logoWrapper}>
            <FaBookOpen className={styles.logoIcon} />
            <h3 className={styles.logoText}>Bookmarket</h3>
          </div>
          <p className={styles.description}>
            پلتفرم تخصصی خرید و تبادل کتاب‌های   صوتی. ما اینجاییم تا دسترسی به دنیای کلمات را برای شما هوشمندتر و جذاب‌تر کنیم.
          </p>
        </div>

        {/* بخش دوم: لینک‌های سریع با استفاده از Link */}
        <div className={styles.footerLinks}>
          <h4>دسترسی سریع</h4>
          <ul>
            {/* <li><Link href="/shop">فروشگاه کتاب</Link></li> */}
            <li><Link href="/aboutUs">درباره ما</Link></li>
            {/* <li><Link href="/blog">وبلاگ</Link></li>
            <li><Link href="/faq">سوالات متداول</Link></li> */}
          </ul>
        </div>

      </div>

      <hr className={styles.footerDivider} />

      {/* بخش پایینی: کپی‌رایت و شبکه‌های اجتماعی باقی‌مانده */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © 1405 بوک‌مارکت. تمامی حقوق برای این پروژه تمرینی محفوظ است.
        </p>
        
        <div className={styles.socialIcons}>
          <Link href="https://www.linkedin.com/in/mojtaba-toobaee-w9r91Awaa?
utm source=share&utm campaign=share via&utm content=prof
ile&utm medium=android app" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <FaLinkedin />
          </Link>
          <Link href="https://github.com/mjtb-tb/bookmarket.git" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
            <FaGithub />
          </Link>
        </div>
      </div>
      <div className={styles.emptySpace}></div>
    </footer>
  );
};

export default Footer;