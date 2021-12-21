import React, {useEffect} from 'react';
import './register.css';
import {Link, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function Register ({userSign, userLogin, setUserSign, setUserLogin, setIsSuccess, isSuccess})  {
    const navigate = useNavigate();
    const {name, email, password, password2} = userSign;

    const onChange = (e) => {
        setUserSign({...userSign, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        //validation here
        if (email === '' || password === '' || password2 === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            })
            return false;
        }

        let users = JSON.parse(localStorage.getItem('users'));
        if (users === null) {
            users = [];
        }
        let userArray = users.filter(user => user.email === email);
        if (userArray.length > 0) {
           Swal.fire({
                title: 'Email already exists',
                text: 'Please try another email',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return false;
        } else {
            if (password !== password2) {
                Swal.fire({
                    title: 'Password not match',
                    text: 'Please try again',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                setIsSuccess(true);
                users.push({
                    name,
                    email,
                    password,
                });
                localStorage.setItem('users', JSON.stringify(users));
                // setUserLogin({...userLogin, email, password});
                navigate('/todo');

            }
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setUserSign({
                name: '',
                email: '',
                password: '',
                password2: '',
            });
        }
    }, [isSuccess, setUserSign]);

    return (
        <div className='register'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-2 text-center'>Sign Up</h1>
                        <p className='lead text-center'>
                            Create your account
                        </p>
                        <form onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    className='form-control form-control-lg'
                                    placeholder='Name'
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='email'
                                    className='form-control form-control-lg'
                                    placeholder='Email Address'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                                <small className='form-text text-muted'>
                                    {email.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && 'Invalid email address'}
                                </small>
                            </div>
                            <div className='form-group'>
                                <input
                                    type='password'
                                    className='form-control form-control-lg'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                />
                                <small className='form-text text-muted'>
                                    {password.length < 8 ? 'Password must be at least 8 characters' : ''}
                                </small>
                            </div>
                            <div className='form-group'>
                                <input
                                    type='password'
                                    className='form-control form-control-lg'
                                    placeholder='Confirm Password'
                                    name='password2'
                                    value={password2}
                                    onChange={onChange}
                                />
                                <small className='form-text text-muted'>
                                    {password !== password2 ? 'Passwords do not match' : ''}
                                </small>
                            </div>
                            <input type='submit' className='btn btn-info  mt-4'/>
                        </form>
                        already have an account? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
