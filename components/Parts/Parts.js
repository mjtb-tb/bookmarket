
import styles from './Parts.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHeart, FaHome, FaThLarge } from 'react-icons/fa';

export default function Parts() {
  const pathname = usePathname();

  return (
    <nav className={styles.partsContainer}>
      <div className={styles.partsContent}>
        
        {/* علاقه‌مندی‌ها */}
        <Link href='/favorites' className={styles.navLink}>
          <div className={`${styles.navItem} ${pathname === '/favorites' ? styles.active : ''}`}>
            <FaHeart className={styles.navIcon} />
            <span className={styles.navText}>علاقه‌مندی‌ها</span>
          </div>
        </Link>

        {/* خانه */}
        <Link href='/home' className={styles.navLink}>
          <div className={`${styles.navItem} ${pathname === '/home' ? styles.active : ''}`}>
            <FaHome className={styles.navIcon} />
            <span className={styles.navText}>خانه</span>
          </div>
        </Link>

        {/* دسته‌بندی‌ها */}
        <Link href='/categories' className={styles.navLink}>
          <div className={`${styles.navItem} ${pathname?.startsWith('/categories') || pathname?.startsWith('/Category') ? styles.active : ''}`}>
            <FaThLarge className={styles.navIcon} />
            <span className={styles.navText}>دسته‌بندی‌ها</span>
          </div>
        </Link>

      </div>
    </nav>
  );
}