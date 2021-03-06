import React from 'react';
import './login.css'
import {Link,useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


const Login = ({userLogin,setUserLogin,isSuccess,setIsSuccess}) => {
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let userLogin = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    let storage = JSON.parse(localStorage.getItem('users'))
    let isSuccess = false
    if (userLogin.email === "" || userLogin.password === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the fields!',
      })
      return false;
    }
    if (storage) {
      storage.forEach(user => {
        if (user.email === userLogin.email && user.password === userLogin.password) {
          isSuccess = true
          console.log("Login success")
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('isLogin', true)
          setIsSuccess(true)
          navigate('/todo')
        }
      })
    }
    if (isSuccess) {
      setUserLogin(userLogin)
      setIsSuccess(true)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email or password is incorrect!',
      })
    }
  }



  return (
    <div className="login">
      <div className="login-container">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={handleChange}/>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
              <p>
                don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;