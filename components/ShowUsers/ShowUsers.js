// import UserItem from "../UserItem/UserItem"
// import styles from './ShowUsers.module.css'


// export default function ShowUsers({data,error,message}){
//     if(error){
//         return(
//             <>{message}</>
//         )
//     }else{
//         return(
//             <>
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>نام کاربری</th>
//                                 <th>نام</th>
//                                 <th>نام خانوداگی</th>
//                                 <th>نقش</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                         {
//                             data.map((user)=>{
//                                 return(
//                                     <UserItem username={user.username} firstname={user.firstname} lastname={user.lastname} role={user.role}></UserItem>
//                                 )
//                             })
//                         }  
//                         </tbody>

//                     </table>
//                 </div>
//             </>
//         )        
//     }

// }

import UserItem from "../UserItem/UserItem";
import Link from 'next/link'; // وارد کردن کامپوننت لینک
import { FaUsers, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa'; // آیکون فلش برای بازگشت
import styles from './ShowUsers.module.css';

export default function ShowUsers({ users, error, message }) {
  if (error) {
    return (
      <div className={styles.centerContainer}>
        <div className={styles.errorBox}>
          <FaExclamationTriangle className={styles.errorIcon} />
          <h3>خطایی رخ داده است</h3>
          <p>{message || 'دریافت اطلاعات کاربران با مشکل مواجه شد.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      
      {/* دکمه بازگشت کاملاً مستقل و خارج از المان‌های جدول */}
      <div className={styles.backButtonWrapper}>
        <Link href="/home" className={styles.backHomeBtn}>
          <FaArrowRight className={styles.btnIcon} />
          <span>بازگشت به صفحه اصلی</span>
        </Link>
      </div>

      {/* هدر جدول (دقیقاً مثل کد بی‌نقص قبلی) */}
      <div className={styles.tableHeader}>
        <FaUsers className={styles.headerIcon} />
        <h2 className={styles.tableTitle}>مدیریت <span className={styles.highlight}>کاربران</span></h2>
      </div>

      <div className={styles.responsiveWrapper}>
        <table className={styles.neonTable}>
          <thead>
            <tr>
              <th>نام کاربری</th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>نقش</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <UserItem 
                key={user._id || user.username} 
                id={user._id}
                username={user.username} 
                firstname={user.firstname} 
                lastname={user.lastname} 
                role={user.role} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}