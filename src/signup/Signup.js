import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from './Signup.module.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setRole] = useState('');

    const history = useHistory();

    async function SignUpUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                "username": userName,
                "email": email,
                "password": password,
                "role": [user]
            });
            console.log(response);
            history.push("/login");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <form className={styles["form-login"]} onSubmit={SignUpUser}>
                <label className={styles["label-email"]} htmlFor="email">
                    Email:
                    <input className={styles["input-email"]}
                           type="email"
                           id="email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           placeholder="Fill in your email"
                    />
                </label>
                <label className={styles["label-username"]} htmlFor="username">
                    Username:
                    <input className={styles["input-username"]}
                           type="text"
                           id="username"
                           onChange={(e) => setUsername(e.target.value)}
                           value={userName}
                           placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <p className={styles["error-message"]}>Je username is niet lang genoeg.</p>}
                    {userName.length >= 6 && <p className={styles["good-message"]}>Je wachtwoord is lang genoeg.</p>}
                </label>
                <label className={styles["label-password"]} htmlFor="password">
                    Password:
                    <input className={styles["input-password"]}
                           type="password"
                           id="password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           placeholder="Your password"
                    />
                    {password.length < 6 && <p className={styles["error-message"]}>Je username is niet lang genoeg.</p>}
                    {password.length >= 6 && <p className={styles["good-message"]}>Je wachtwoord is lang genoeg.</p>}
                </label>
                <label className={styles["label-role"]} htmlFor="role">
                    Role:
                    <input className={styles["input-role"]}
                           type="text"
                           id="role"
                           onChange={(e) => setRole(e.target.value)}
                           value={user}
                           placeholder="user or admin"
                    />
                </label>
                <button className={styles["button"]} type="submit">Register</button>
            </form>
        </>
    );
}

export default Signup;
