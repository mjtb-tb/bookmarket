import styles from './CategoriesContainer.module.css';
import Link from 'next/link';
import { FaGlobeAsia, FaRocket, FaLightbulb } from 'react-icons/fa';

export default function CategoriesContainer() {
  return (
    <div className={styles.categories}>
      <h2 className={styles.sectionTitle}>دسته‌بندی موضوعی کتاب‌ها</h2>
      
      <div className={styles.categoriesContent}>
        
        {/* کارت کهکشان */}
        <Link href='/Category/space' className={styles.cardLink}>
          <div className={`${styles.categoryCard} ${styles.spaceCard}`}>
            <div className={styles.iconWrapper}>
              <FaRocket className={styles.cardIcon} />
            </div>
            <div className={styles.cardDetails}>
              <h3 className={styles.categoryName}>کهکشان و نجوم</h3>
              <p className={styles.categoryDesc}>سفر به اعماق فضا و شناخت جهان هستی</p>
            </div>
          </div>
        </Link>

        {/* کارت انگیزشی */}
        <Link href='/Category/motivational' className={styles.cardLink}>
          <div className={`${styles.categoryCard} ${styles.motivationalCard}`}>
            <div className={styles.iconWrapper}>
              <FaLightbulb className={styles.cardIcon} />
            </div>
            <div className={styles.cardDetails}>
              <h3 className={styles.categoryName}>انگیزشی</h3>
              <p className={styles.categoryDesc}>کتاب‌هایی برای موفقیت و توسعه فردی</p>
            </div>
          </div>
        </Link>

        {/* کارت علمی */}
        <Link href='/Category/science' className={styles.cardLink}>
          <div className={`${styles.categoryCard} ${styles.scienceCard}`}>
            <div className={styles.iconWrapper}>
              <FaGlobeAsia className={styles.cardIcon} />
            </div>
            <div className={styles.cardDetails}>
              <h3 className={styles.categoryName}>علمی و دانش</h3>
              <p className={styles.categoryDesc}>کاوش در دنیای علم، فناوری و حقایق</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}