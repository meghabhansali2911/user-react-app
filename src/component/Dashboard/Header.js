import React, { useContext } from 'react';
import { DataContext } from '../../context/Context';

const Header = () => {

    const { userData } = useContext(DataContext);

    return (
        <>
            <header>
                <div className="logosec">
                    <div className="logo">Student Panel</div>
                </div>

                <div className="message">
                    <p>{userData.user_name}</p>
                    <div className="dp">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            className="dpicn"
                            alt="dp"
                        />
                    </div>
                </div>
            </header>

        </>
    );
}

export default Header