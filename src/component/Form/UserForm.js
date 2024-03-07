import React, { useContext, useEffect, useState } from 'react';
import Header from '../Dashboard/Header';
import { NavBar } from '../Dashboard/NavBar';
import axios from 'axios';
import { DataContext } from '../../context/Context';

export const UserForm = ({ data }) => {

    const { setClicked, setPerform } = useContext(DataContext);

    const [formValue, setFormValue] = useState({
        user_name: "",
        phone_number: "",
        email: ""
    });


    const [error, setError] = useState(false);

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

            data.perform === 'Edit' ? handleEdit() : handleAdd();


        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setError('');
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleAdd = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_NODE_URL + "/add-student-data", formValue);

            if (response.data.status === true) {
                setFormValue({
                    user_name: "",
                    phone_number: "",
                    email: ""
                });
                setClicked(false);
                setPerform('');

            } else {
                setError(response.data.message);
            }
            // Code that may throw an exception
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleEdit = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_NODE_URL + "/edit-student-data", { ...formValue, userId: data.userId });

            if (response.data.status === true) {
                setFormValue({
                    user_name: "",
                    phone_number: "",
                    email: ""
                });
                setClicked(false);
                setPerform('');

            } else {
                setError(response.data.message);
            }
            // Code that may throw an exception
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    async function fetchData() {

        const response = await axios.get(process.env.REACT_APP_NODE_URL + `/get-student-data?userId=${data.userId}`);

        if (response.data.status === true) {
            const userDetails = response.data.data;
            setFormValue({
                user_name: userDetails.user_name,
                phone_number: userDetails.phone_number,
                email: userDetails.email,
            });
        }
    }

    useEffect(() => {
        data.userId && fetchData();
    }, [data.userId])


    return (
        <>
            <Header />
            <div className="main-container">
                <NavBar />
                <div className="main">
                    <div className="report-container">
                        <div className="report-header">
                            <h1 className="recent-Articles">{data.perform} User</h1>
                            <button className="add" >Save Data</button>
                        </div>

                        <div className="signin_div">
                            <form action="">
                                {/* <div className="signin-title">
                                    <span className="title">{data} User Data</span>
                                </div> */}
                                <div className="filed-content">
                                    <input className="fill-input" type="text" name="user_name" value={formValue.user_name} placeholder="User Name" onChange={handleChange} />
                                </div>
                                <div className="filed-content">
                                    <input className="fill-input" type="text" name="phone_number" value={formValue.phone_number} placeholder="Phone Number" onChange={handleChange} />
                                </div>
                                <div className="filed-content">
                                    <input className="fill-input" type="text" name="email" value={formValue.email} placeholder="Email" onChange={handleChange} />
                                </div>

                                <span style={{ color: 'red', textAlign: 'left', display: 'block' }}>{error}</span>

                                <div className="next-btn mt-4">
                                    <button onClick={(e) => handleSubmit(e)}>{data.perform} & Save</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
