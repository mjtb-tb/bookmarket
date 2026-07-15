import React, { useState } from 'react';
// اضافه کردن آیکون‌های چشم باز و بسته
import { FaUser, FaLock, FaUserTag, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './RegisterForm.module.css';
import { toast } from 'sonner';
import { error } from 'three';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  // State جدید برای مدیریت نمایش/مخفی کردن رمز عبور
  const [showPassword, setShowPassword] = useState(false);

  const fetchHandler = async (e) => {
    e.preventDefault();
    const { username, password, firstname, lastname } = formData;

    try {
      let response = await fetch('/api/signUp', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, firstname, lastname })
      });
      let data = await response.json();
      console.log('پاسخ سرور:', data);
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success('حساب با موفقیت ساخته شد')
      }
      
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
      toast.error('خطا در ساخت حساب')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // بررسی فیلدهای نام کاربری و رمز عبور برای جلوگیری از ورود حروف فارسی/عربی
    if (name === 'username' || name === 'password') {
      const persianRegex = /[\u0600-\u06FF]/;
      if (persianRegex.test(value)) {
        return;
      }
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // تابع برای تغییر وضعیت نمایش رمز عبور
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.neonFormContainer}>
      <form className={styles.neonForm} onSubmit={fetchHandler}>
        <h2 className={styles.formTitle}>ثبت نام در <span className={styles.highlight}>Bookmarket</span></h2>
        <p className={styles.formSubtitle}>به دنیای کتاب‌ها خوش آمدید</p>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>نام</label>
            <div className={styles.inputWrapper}>
              <FaUserTag className={styles.inputIcon} />
              <input 
                type="text" 
                name="firstname" 
                value={formData.firstname} 
                onChange={handleChange} 
                placeholder="firstname"
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>نام خانوادگی</label>
            <div className={styles.inputWrapper}>
              <FaUserTag className={styles.inputIcon} />
              <input 
                type="text" 
                name="lastname" 
                value={formData.lastname} 
                onChange={handleChange} 
                placeholder="lastname"
                required 
              />
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>نام کاربری (فقط انگلیسی و اعداد)</label>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              placeholder="Username"
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>رمز عبور (فقط انگلیسی و اعداد)</label>
          <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
            <FaLock className={styles.inputIcon} />
            {/* تغییر نوع ورودی بر اساس state */}
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="••••••••"
              required 
              className={styles.passwordInput} // اضافه کردن کلاس خاص برای input
            />
            {/* آیکون چشم به عنوان دکمه */}
            <button
              type="button" // برای جلوگیری از ارسال فرم هنگام کلیک
              onClick={togglePasswordVisibility}
              className={styles.eyeBtn}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.neonBtn}>
          ایجاد حساب کاربری
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;