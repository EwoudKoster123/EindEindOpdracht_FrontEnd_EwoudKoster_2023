import React, {useState} from 'react';
import styles from "../styles/Signup.module.css"

import axios from "axios";
import {useHistory} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setRole] = useState('');

    const history = useHistory()


    async function SignUpUser(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    "username": userName,
                    "email": email,
                    "password": password,
                    "role": [user]
                });
            console.log(response)

            history.push("/login")
        } catch (e) {
            console.error(e);

        }
    }


    return (

        <>
            <div/>

            <form onSubmit={SignUpUser} className={styles["layout"]}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Fill in your email"
                    />
                </label>
                <label htmlFor="username" className={styles["label"]}>
                    Username:
                    <input
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <p className={styles["error"]}>Your username isn't long enough</p>}
                    {userName.length >= 6 && <p className={styles["good"]}>Your username is long enough</p>}
                </label>
                <label htmlFor="password" className={styles["label"]}>
                    Password:
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Your password"
                    />
                    {password.length < 6 && <p className={styles["error"]}>Your password isn't long enough</p>}
                    {password.length >= 6 && <p className={styles["good"]}>Your password is long enough</p>}

                </label>

                <label htmlFor="role" className={styles["label"]}>
                    Role:
                    <input
                        type="text"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={user}
                        placeholder="user or admin"
                    />
                </label>

                <button type="submit" className={styles["button"]}>Register</button>
            </form>


        </>

    );
}

export default Signup;