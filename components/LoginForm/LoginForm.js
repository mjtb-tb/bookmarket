import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './LoginForm.module.css';
import { toast } from 'sonner';
import { error } from 'three';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const fetchHandler = async (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    try {
      let response = await fetch('/api/signIn', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      let data = await response.json();
      console.log('پاسخ سرور:', data);
      if(!data.error){
        toast.success(" با موفقیت وارد شدید ")
      }else{
        toast.error(`${data.message}`)
      }
      
    } catch (error) {
      console.error('خطا در ارسال درخواست:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // جلوگیری از ورود حروف فارسی/عربی در نام کاربری و رمز عبور
    if (name === 'username' || name === 'password') {
      const persianRegex = /[\u0600-\u06FF]/;
      if (persianRegex.test(value)) {
        return;
      }
    }

    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className={styles.neonFormContainer}>
      <form className={styles.neonForm} onSubmit={fetchHandler}>
        <h2 className={styles.formTitle}>ورود به <span className={styles.highlight}>Bookmarket</span></h2>
        <p className={styles.formSubtitle}>خوش آمدید! لطفاً وارد حساب خود شوید</p>

        <div className={styles.inputGroup}>
          <label>نام کاربری</label>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input 
              type="text" 
              name="username" 
              value={loginData.username} 
              onChange={handleChange} 
              placeholder="Username"
              required 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>رمز عبور</label>
          <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
            <FaLock className={styles.inputIcon} />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={loginData.password} 
              onChange={handleChange} 
              placeholder="••••••••"
              required 
              className={styles.passwordInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.eyeBtn}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.neonBtn}>
          ورود به حساب
        </button>
      </form>
    </div>
  );
};

export default LoginForm;