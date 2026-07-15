// import styles from './BookBox.module.css'
// import Image from 'next/image'
// export default function BookBox({bookname,author,category,price}){
//     return(
//         <>
//             <div className={styles.Book}>
//                 <div className={styles.Book_top}>
//                     <div className={styles.Book_top_imgContainer}>
//                         <Image
//                             className={styles.Book_top_img} 
//                             src={'/moon.JPG'} 
//                             fill // 👈 این ویژگی به عکس می‌گوید کل فضای پدر را پر کن
//                             // className="object-cover" // 👈 از دفرمه شدن یا کشیدگی عکس جلوگیری می‌کند
//                             // sizes="(max-width: 768px) 100vw, 33vw" // 👈 برای بهینه‌سازی فوق‌العاده حجم عکس در موبایل و دسکتاپ
//                         >
//                         </Image>
//                     </div>
//                 </div>
//                 <div className={styles.Book_bottom}>
//                     <div className={styles.Book_bottom_bookname}>
//                         <div className={styles.Book_bottom_bookname_title}>نام کتاب:</div>
//                         <div className={styles.Book_bottom_bookname_text}>{bookname}</div>
//                     </div>
//                     <div className={styles.Book_bottom_author}>
//                         <div className={styles.Book_bottom_author_title}> نویسنده:</div>
//                         <div className={styles.Book_bottom_author_text}> {author}</div>
//                     </div>
//                     <div className={styles.Book_bottom_category}>
//                         <div className={styles.Book_bottom_category_title}> دسته بندی:</div>
//                         <div className={styles.Book_bottom_category_text}> {category}</div>
//                     </div>
//                     <div className={styles.Book_bottom_price}>
//                         <div className={styles.Book_bottom_price_title}> قیمت:</div>
//                         <div className={styles.Book_bottom_price_text}> {price}</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

import styles from './BookBox.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // 👈 اضافه کردن useEffect
import { toast } from 'sonner';
import { FaUser, FaTag, FaBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';

export default function BookBox({ id, bookname, author, category, favorite ,coverImg, onRemove , onAdd}) {
  const [isFavorite , setIsFavorite] = useState(favorite);

  // 🔴 هماهنگ کردن استیت داخلی با تغییرات پراپس ورودی پدر (حل مشکل اصلی شما)
  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);
  
  const handleFavoriteClick = async () => {
     console.log(`کتاب ${bookname} کلیک شد. وضعیت فعلی: ${isFavorite}`);
     
      if (!isFavorite) {
          try { 
            const response = await fetch('/api/addToFavorites', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookId: id })
            });
            const data = await response.json();
            
            if (data.error) {
              toast.error(data.message);
            } else {
              toast.success(data.message);
              setIsFavorite(true); // آپدیت موفقیت‌آمیز استیت
              onAdd([...data.data.wishlist])
            }
          } catch {
            toast.error('خطا در ارتباط با سرور');
          }
          
          // window.location.reload();
      } else {
            try { 
            const response = await fetch('/api/removeFromFavorites', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookId: id })
            });
            const data = await response.json();
            
            if (data.error) {
              toast.error(data.message);
            } else {
              toast.success(data.message);
              setIsFavorite(false); 
              onRemove(id)
            }
          } catch {
            toast.error('خطا در ارتباط با سرور');
          }
          
          // window.location.reload();
      }
  };

  return (
<Link href={`./${id}`}>
    <div className={styles.bookCard}>
      {/* بخش بالایی: تصویر کتاب با روبان دسته‌بندی */}
      <div className={styles.bookTop}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.bookImg} 
            src={coverImg} 
            fill 
            unoptimized // 👈 اضافه کردن این مورد برای تست
            alt={bookname}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <span className={styles.categoryBadge}>
          <FaTag className={styles.badgeIcon} />
          {category}
        </span>
      </div>

      {/* بخش پایینی: جزئیات و دکمه علاقه‌مندی */}
      <div className={styles.bookBottom}>
        <div className={styles.titleWrapper}>
          <FaBookmark className={styles.titleIcon} />
          <h3 className={styles.bookName} title={bookname}>{bookname}</h3>
        </div>

        <div className={styles.authorWrapper}>
          <FaUser className={styles.authorIcon} />
          <span className={styles.authorName}>{author}</span>
        </div>

        {/* دکمه افزودن به علاقه‌مندی‌ها - کاملاً زنده بر اساس استیت هماهنگ‌شده */}
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`} 
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        >
          {isFavorite ? (
            <FaHeart className={styles.heartIcon} />
          ) : (
            <FaRegHeart className={styles.heartIcon} />
          )}
          <span>{isFavorite ? 'در لیست علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}</span>
        </button>
      </div>
    </div>
    </Link>
  );
}