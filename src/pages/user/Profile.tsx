import React, {useEffect, useState} from 'react';
import {getCurrentUser} from "../../util/APIUtil";

interface User {
    name: string,
    email: string,
    imageUrl: string
}

function Profile() {
    const [user, setUser] = useState({} as User)

    useEffect(() => {
        getCurrentUser().then(response => {
            setUser(response)
        })
    })

    return (
        <div className="profile-container">
            <div className="container">
                <div className="profile-info">
                    <div className="profile-avatar">
                        {
                            user.imageUrl ? (
                                <img src={user.imageUrl} alt={user.name}/>
                            ) : (
                                <div className="text-avatar">
                                    <span>{user.name && user.name[0]}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className="profile-name">
                        <h2>{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile
