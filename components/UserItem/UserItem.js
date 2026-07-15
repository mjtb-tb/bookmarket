// import styles from './UserItem.module.css'

// export default function UserItem({_id,username,firstname,lastname,role}){
//     return(
//         <>
//             <tr>
//                 <th>{username}</th>
//                 <th>{firstname}</th>
//                 <th>{lastname}</th>
//                 <th>{role}</th>
//                 <th>
//                     <button> حذف </button>
//                 </th>
//             </tr>
//         </>
//     )
// }

import { FaTrashAlt } from 'react-icons/fa';
import styles from './UserItem.module.css';
import { toast } from 'sonner';

export default function UserItem({ id, username, firstname, lastname, role }) {
  
  const handleDelete = async () => {
    console.log(`حذف کاربر با آی‌دی: ${id}`);
    // بعداً توابع یا درخواست فچ حذف رو اینجا اضافه کن
        const isConfirmed = window.confirm("آیا از حذف کاربر مطمئن هستید؟");
        if(isConfirmed){
                      try{
                  const respone =  await fetch('/api/deleteUser',{
                      method:'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({userId:id})
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
      <td className={styles.usernameCell}>{username}</td>
      <td>{firstname}</td>
      <td>{lastname}</td>
      <td>
        {/* استایل متمایز برای ادمین و کاربران عادی */}
        <span className={`${styles.roleBadge} ${role === 'ADMIN' ? styles.admin : styles.user}`}>
          {role === 'ADMIN' ? 'مدیر' : 'کاربر'}
        </span>
      </td>
      <td>
        <button className={styles.deleteBtn} onClick={handleDelete} title="حذف کاربر">
          <FaTrashAlt className={styles.trashIcon} />
          <span>حذف</span>
        </button>
      </td>
    </tr>
  );
}