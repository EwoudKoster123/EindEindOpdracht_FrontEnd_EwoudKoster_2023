import React, { useContext, useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../auth context/AuthContext";
import styles from "./Login.module.css";


function LoginPage() {
    const { login } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();


    function handleRedirectButton() {
        history.push('/profile');
    }
    function handleRedirectSignup() {
        history.push('/signup');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userName,
                "password": password,
            });
            login(response);
            history.push("/profile");


        } catch (e) {
            console.error(e.response);
        }
    }

    return (
        <>
            <form className={styles["Form"]} onSubmit={handleSubmit}>
                <label className={styles["Label-Username"]} htmlFor="login-username">
                    Username:
                    <input className={styles["input-username"]}
                        type="text"
                        id="login-username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <errormessage className={styles["error-message"]}>Your username isn't long enough</errormessage>}
                    {userName.length >= 6 && <goodmessage className={styles["good-message"]}>Your username is long enough</goodmessage>}
                </label>

                <label className={styles["Label-Password"]} htmlFor="login-password">
                    Password:
                    <input className={styles["input-password"]}
                        type="password"
                        id="login-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Fill in your password"
                    />
                    {password.length < 6 && <errormessage className={styles["error-message"]}>Your password isn't long enough</errormessage>}
                    {password.length >= 6 && <goodmessage className={styles["good-message"]}>Your password is long enough</goodmessage>}
                </label>

                <button className={styles["login-button"]} type="button" onClick={handleRedirectButton}>
                    Login
                </button>

            </form>


            <signupprompt onClick={handleRedirectSignup} className={styles["signup-prompt"]}>Heeft u geen account? Klik dan:<styledlink className={styles["styled-link"]}>Signup</styledlink></signupprompt>
        </>
    );
}

export default LoginPage;
