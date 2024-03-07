import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { DataContext } from '../../context/Context';

export const CreateAccount = () => {
    const navigate = useNavigate();
    const { isLogin } = useContext(DataContext);

    const [formValue, setformvalue] = useState({
        user_name: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: ""
    });


    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const regex = /^.{3,40}$/;
            const regexEmail = /\S+@\S+\.\S+/;
            if (!regexEmail.test(formValue.email)) {
                return setError('Enter Valid email id');
            }
            if (!regex.test(formValue.user_name)) {
                return setError('Enter Valid user name');
            }
            if (!/^[0-9]{10}$/.test(formValue.phone_number)) {
                return setError('Enter Valid phone number');
            }
            if (!regex.test(formValue.password)) {
                return setError('Enter Valid password');
            }
            if (!regex.test(formValue.confirm_password)) {
                return setError('Enter Valid password');
            } else if (formValue.password !== formValue.confirm_password) {
                return setError('Password does not match');
            }


            const response = await axios.post(process.env.REACT_APP_NODE_URL + "/create-new-user", formValue);

            if (response.data.status === true) {
                alert(response.data.message);
                localStorage.setItem('login', true);
                navigate('/dashboard');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setError('');
        setformvalue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        if (isLogin) {
            window.location.replace('/dashboard');
        } else {
            setLoader(false);
        }
    }, [isLogin])


    return (
        <div className="App">
            {loader ? null :
                <div className="container-fluid bg-hero">
                    <div className="container">
                        <div className="signin-container">
                            <div className="signin_box">
                                <div className="signin_div">
                                    <form action="">
                                        <div className="signin-title">
                                            <span className="title">Create New Account</span>
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type="text" name="user_name" value={formValue.user_name} placeholder="User Name" onChange={handleChange} />
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type="text" name="phone_number" value={formValue.phone_number} placeholder="Phone Number" onChange={handleChange} />
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type="text" name="email" value={formValue.email} placeholder="Email" onChange={handleChange} />
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type={isRevealPwd ? "text" : "password"} name="password" value={formValue.password} placeholder="Enter Password" onChange={handleChange}
                                            />
                                            <div className='icon'>{isRevealPwd ? (<FaEyeSlash onClick={() => setIsRevealPwd(false)} />) : (<FaEye onClick={() => setIsRevealPwd(true)} />)}</div>
                                        </div>
                                        <div className="filed-content">
                                            <input className="fill-input" type={isRevealPwd ? "text" : "confirm_password"} name="confirm_password" value={formValue.confirm_password} placeholder="Confirm Password" onChange={handleChange}
                                            />
                                            <div className='icon'>{isRevealPwd ? (<FaEyeSlash onClick={() => setIsRevealPwd(false)} />) : (<FaEye onClick={() => setIsRevealPwd(true)} />)}</div>
                                        </div>
                                        <span style={{ color: 'red', textAlign: 'left', display: 'block' }}>{error}</span>

                                        <div className="next-btn mt-4">
                                            <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
                                        </div>
                                        <div className="create-account">
                                            <a href="/">Sign In .??</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="rightside_box">
                                <div className="login-img">
                                    <img src="img/login.png.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};