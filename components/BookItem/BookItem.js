import { error } from 'three';
import styles from './BookItem.module.css';
import { toast } from 'sonner';

export default function BookItem({ _id, bookLabel, bookname, author, status, category,userId }) {
  
  // ۱. تابع تایید کتاب
  const handleAccept = async () => {
    const isConfirmed = window.confirm(`آیا از تایید کتاب "${bookname}" اطمینان دارید؟`);
    if (isConfirmed) {
      console.log(`کتاب با آی‌دی ${_id} تایید شد.`);
      // کد یا ریکوئست سمت سرور برای تایید را اینجا بنویس
      try{
        const respone =  await fetch('/api/confirmBook',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookId:_id})
        }
        )
        const data = await respone.json()
        if(data.error){
            toast.error(data.message)
        }
        toast.success(data.message)
        setTimeout(()=>{
          window.location.reload();  
        },2000)
      }catch{
        toast.error("مشکلی رخ داده است")
      }
    }
  };

  // ۲. تابع رد کردن کتاب
  const handleReject = async () => {
    const isConfirmed = window.confirm(`آیا از رد کردن کتاب "${bookname}" اطمینان دارید؟`);
    if (isConfirmed) {
      console.log(`کتاب با آی‌دی ${_id} رد شد.`);
    
      // کد یا ریکوئست سمت سرور برای تایید را اینجا بنویس
      try{
        const respone =  await fetch('/api/deleteBook',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookId:_id,userId})
        }
        )
        const data = await respone.json()
        if(data.error){
            toast.error(data.message)
        }
        toast.success(data.message)
        setTimeout(()=>{
          window.location.reload();  
        },2000)
      }catch{
        toast.error("مشکلی رخ داده است")
      }
    }
  };

  // ۳. تابع حذف کتاب
  const handleDelete = async () => {
    const isConfirmed = window.confirm(`آیا از حذف کامل کتاب "${bookname}" مطمئن هستید؟ این عملیات غیرقابل بازگشت است.`);
    if (isConfirmed) {
      console.log(`کتاب با آی‌دی ${_id} حذف شد.`);
      // کد یا ریکوئست سمت سرور برای حذف را اینجا بنویس
            try{
        const respone =  await fetch('/api/deleteBook',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({bookId:_id,userId})
        }
        )
        const data = await respone.json()
        if(data.error){
            toast.error(data.message)
        }
        toast.success(data.message)
        setTimeout(()=>{
          window.location.reload();  
        },1500)
      }catch{
        toast.error("مشکلی رخ داده است")
      }
    }
  };

  return (
    <tr className={styles.tableRow}>
      <td className={styles.labelCell}>{bookLabel}</td>
      <td className={styles.bookNameCell}>{bookname}</td>
      <td>{author}</td>
      <td>{category}</td>
      <td>
        <span className={`${styles.statusBadge} ${status === 'pending' ? styles.pending : styles.approved}`}>
          {status === 'pending' ? 'در انتظار تایید' : 'تایید شده'}
        </span>
      </td>
      <td>
        <div className={styles.actionsContainer}>
          {status === "pending" ? (
            <>
              {/* اتصال توابع به رویداد onClick */}
              <button className={styles.acceptBtn} onClick={handleAccept}>تایید</button> 
              <button className={styles.rejectBtn} onClick={handleReject}>رد کردن</button>
            </>
          ) : (
            <button className={styles.deleteBtn} onClick={handleDelete}>حذف</button>
          )}
        </div>
      </td>
    </tr>
  );
}