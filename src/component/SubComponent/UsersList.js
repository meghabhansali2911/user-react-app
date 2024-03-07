import React, { useContext, useEffect, useState } from 'react'
import Header from '../Dashboard/Header'
import { NavBar } from '../Dashboard/NavBar'
import { UserForm } from '../Form/UserForm'
import { DataContext } from '../../context/Context'
import axios from 'axios'

export const UsersList = () => {

    const { clicked, setClicked, perform, setPerform, userId, setUserId } = useContext(DataContext);
    const [userList, setUserList] = useState([])
    const [message, setMessage] = useState("Loading....")

    function handleAddUser() {
        try {
            setClicked(true);
            setPerform("Add");
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    function handleEditUser(id) {
        try {
            setClicked(true);
            setPerform("Edit");
            setUserId(id);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    async function handleDeleteUser(id) {
        if (!id) {
            return;
        } else {
            if (window.confirm("Are you sure you want to delete?")) {
                const response = await axios.get(process.env.REACT_APP_NODE_URL + `/delete-student-data?userId=${id}`);

                if (response.data.status === true) {
                    setUserList(response.data.data);
                } else {
                    setMessage(response.data.message);
                }
            }
            fetchData()

        }

    }

    async function fetchData() {
        const response = await axios.get(process.env.REACT_APP_NODE_URL + "/user-list");

        if (response.data.status === true) {
            setUserList(response.data.data);
            response.data.data.length <= 0 && setMessage("No Data Found");
        } else {
            setMessage(response.data.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [clicked])

    return (
        <>
            <Header />
            {clicked ? <UserForm data={{ perform, userId }} /> :

                <div className="main-container">
                    <NavBar />
                    <div className="main">
                        <div className="report-container">
                            <div className="report-header">
                                <h1 className="recent-Articles">Users List</h1>
                                <button className="add" onClick={() => { handleAddUser() }}>Add New User</button>
                            </div>

                            {userList.length > 0 ?
                                <div className="report-body">
                                    <div className="report-topic-heading">
                                        <h2 className="t-op">User Id</h2>
                                        <h2 className="t-op">User Name</h2>
                                        <h2 className="t-op">Email</h2>
                                        <h2 className="t-op">Phone Number</h2>
                                        <h2 className="t-op">Action</h2>
                                        <h2 className="t-op"></h2>
                                    </div>
                                    <div className="items">
                                        {userList.map((user, index) => {
                                            return (
                                                <div className="item1" key={index}>
                                                    <h2 className="t-op-nextlvl">{user.userId}</h2>
                                                    <h2 className="t-op-nextlvl">{user.user_name}</h2>
                                                    <h2 className="t-op-nextlvl">{user.email}</h2>
                                                    <h2 className="t-op-nextlvl">{user.phone_number}</h2>
                                                    <button className="edit" onClick={() => handleEditUser(user.userId)}>Edit</button>
                                                    <button className="delete" onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                                                </div>

                                            )
                                        })
                                        }

                                    </div>
                                </div>

                                :
                                <div className="item1">
                                    <h2 className="t-op-nextlvl">{message}</h2>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            }

        </>
    )
}
