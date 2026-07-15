import { FaInfoCircle } from 'react-icons/fa';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutCard}>
        
        {/* هدر بخش درباره ما */}
        <div className={styles.aboutHeader}>
          <FaInfoCircle className={styles.aboutIcon} />
          <h2 className={styles.aboutTitle}>درباره <span className={styles.highlight}>ما</span></h2>
        </div>

        {/* بخش متن اصلی */}
        <div className={styles.aboutContent}>
          <p>
           این سایت یک پروژه تمرینی است که توسط بنده یعنی سید مجتبی طوبایی ساخته شده. خوشحال میشم اگر به گیت هاب و لینکدین که آدرسشون در footer سایت گذاشته شده سر بزنید.
          </p>
          <p>
           بنده سعی کردم در هر پروژه پیشرفت کنم و امکانات بیشتری در اون قرار بدم به هر حال امیدوارم این پروژه هرچند تمرینی رضایت بخش باشه.
          </p>
        </div>

      </div>
    </div>
  );
}