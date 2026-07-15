// import { useState } from 'react';

// export default function SimpleCloudinaryUpload() {
//   const [fileUrl, setFileUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   // مشخصات کلودینری خود را اینجا جایگذاری کنید
//   const CLOUD_NAME = "x4lh4kxk"
// ; 
//   const UPLOAD_PRESET = "my_preset"; 

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const file = e.target.file.files[0];
//     if (!file) return;

//     setLoading(true);
    
//     // ساخت فرم مخصوص کلودینری
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', UPLOAD_PRESET); // همان پریستی که unsigned ساختید

//     try {
//       // ارسال مستقیم به سرور ابری کلودینری
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
      
//       if (response.ok) {
//         // کلودینری آدرس مستقیم فایل را در secure_url برمی‌گرداند
//         setFileUrl(data.secure_url);
//       } else {
//         console.error(data.error?.message);
//         alert('خطا در آپلود ابری');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('مشکلی در اتصال پیش آمد');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', direction: 'rtl', fontFamily: 'sans-serif' }}>
//       <h3>آپلود ابری مستقیم به Cloudinary (رایگان و دائمی)</h3>
      
//       <form onSubmit={handleUpload}>
//         <input type="file" name="file" accept="image/*, audio/*" required />
//         <br /><br />
//         <button type="submit" disabled={loading}>
//           {loading ? 'در حال ارسال فایل به ابر...' : 'شروع آپلود'}
//         </button>
//       </form>

//       {fileUrl && (
//         <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd' }}>
//           <p>🎉 فایل شما با موفقیت ذخیره شد و لینک آن دائمی است:</p>
//           <a href={fileUrl} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all' }}>
//             {fileUrl}
//           </a>
          
//           <div style={{ marginTop: '1.5rem' }}>
//             {/* اگر پسوند صوتی بود پلیر و اگر عکس بود تصویر نشان داده می‌شود */}
//             {fileUrl.match(/\.(mp3|wav|m4a|ogg)$/i) ? (
//               <audio src={fileUrl} controls />
//             ) : (
//               <img src={fileUrl} width="300" alt="آپلود شده" style={{ borderRadius: '8px' }} />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { FaCloudUploadAlt, FaMusic, FaImage, FaSpinner, FaCheckCircle, FaBook, FaUser, FaTag, FaLayerGroup } from 'react-icons/fa';
import styles from './AddBookForm.module.css';
import { toast } from 'sonner';

export default function AddBookForm({ id , bookCount}) {
  // فیلدهای متنی فرم
  const [bookname, setBookname] = useState('');
  const [author, setAuthor] = useState('');
  
  // مقدار اولیه دسته‌بندی را روی یکی از ۳ گزینه معتبر می‌گذاریم
  const [category, setCategory] = useState('space');
  const [bookLabel, setBookLabel] = useState('');
  
  // وضعیت آپلود و لودینگ
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // مشخصات کلودینری
  const CLOUD_NAME = "x4lh4kxk"; 
  const UPLOAD_PRESET = "my_preset"; 
  const USER_ID = id; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const imageFile = e.target.imageFile.files[0];
    const audioFile = e.target.audioFile.files[0];
    
    if (!imageFile || !audioFile) {
      alert('لطفاً هم تصویر کاور و هم فایل صوتی را انتخاب کنید.');
      return;
    }

    setLoading(true);
    setSuccess(false);

    // تابع کمکی برای آپلود فایل در کلودینری
    const uploadToCloudinary = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      
      if(bookCount>0){
        toast.error(" شما قبلا کتاب ثبت  کرده اید")
        return
      }
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'خطا در آپلود فایل');
      }
      
      const data = await response.json();
      return data.secure_url;
    };

    try {
      // مرحله ۱: آپلود همزمان عکس و صدا به کلودینری
      const [coverImg, sound] = await Promise.all([
        uploadToCloudinary(imageFile),
        uploadToCloudinary(audioFile)
      ]);

      // مرحله ۲: ارسال کل اطلاعات به API محلی شما
      const apiResponse = await fetch('/api/addBook', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookLabel,
          bookname,
          author,
          category, // ارسال یکی از مقادیر space, science, motivational
          coverImg,
          sound,
          userId: USER_ID
        }),
      });

      const result = await apiResponse.json();

      if (result.error) {
        alert(result.message); 
      } else {
        setSuccess(true);
        // ریست کردن فرم
        setBookname('');
        setAuthor('');
        setCategory('space'); // برگشت به مقدار پیش‌فرض معتبر
        setBookLabel('');
        e.target.reset();
      }
      
    } catch (err) {
      console.error(err);
      alert(err.message || 'مشکلی در ارتباط با سرور پیش آمد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      
      <div className={styles.uploadHeader}>
        <FaCloudUploadAlt className={styles.uploadHeaderIcon} />
        <h3 className={styles.uploadHeaderTitle}>افزودن کتاب جدید</h3>
        <p className={styles.uploadHeaderSubtitle}>اطلاعات فایل صوتی و کاور کتاب را وارد کنید</p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        
        {/* نام کتاب */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaBook /> نام کتاب:</label>
          <input 
            type="text" 
            value={bookname} 
            onChange={(e) => setBookname(e.target.value)} 
            required 
            className={styles.textInput}
            placeholder="مثال: شاهنامه"
          />
        </div>

        {/* نویسنده */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaUser /> نویسنده:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            className={styles.textInput}
            placeholder="مثال: فردوسی"
          />
        </div>

        {/* دسته‌بندی محدود شده به سه گزینه */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaLayerGroup /> دسته‌بندی:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
            className={styles.selectInput}
          >
            <option value="space">فضای بیرونی و نجوم (Space)</option>
            <option value="science">علمی (Science)</option>
            <option value="motivational">انگیزشی (Motivational)</option>
          </select>
        </div>

        {/* برچسب یکتا (bookLabel) */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaTag /> برچسب یکتای کتاب (Book Label):</label>
          <input 
            type="text" 
            value={bookLabel} 
            onChange={(e) => setBookLabel(e.target.value)} 
            required 
            className={styles.textInput}
            placeholder="مثال: shahnameh-01"
          />
        </div>

        {/* ورودی عکس کاور */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaImage style={{ color: '#00f2fe' }} /> تصویر کاور کتاب:</label>
          <input type="file" name="imageFile" accept="image/*" required className={styles.uploadFileInput} />
        </div>

        {/* ورودی فایل صوتی */}
        <div className={styles.uploadInputGroup}>
          <label className={styles.uploadLabel}><FaMusic style={{ color: '#9d4edd' }} /> فایل صوتی کتاب:</label>
          <input type="file" name="audioFile" accept="audio/*" required className={styles.uploadFileInput} />
        </div>

        {/* دکمه ثبت */}
        <button 
          type="submit" 
          disabled={loading}
          className={`${styles.uploadSubmitBtn} ${loading ? styles.disabled : ''}`}
        >
          {loading ? (
            <>
              <FaSpinner className={styles.uploadSpinner} />
              <span>در حال آپلود و ثبت اطلاعات کتاب...</span>
            </>
          ) : (
            <span>ثبت نهایی کتاب</span>
          )}
        </button>
      </form>

      {/* پیام موفقیت */}
      {success && (
        <div className={styles.uploadResultContainer}>
          <div className={styles.uploadSuccessMessage}>
            <FaCheckCircle /> <span>کتاب با موفقیت ثبت شد و در وضعیت در انتظار تایید (pending) قرار گرفت.</span>
          </div>
        </div>
      )}

    </div>
  );
}