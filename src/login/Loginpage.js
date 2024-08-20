import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from "../auth context/AuthContext";
import useRedirectButton from '../helpers/useRedirectButton';
import styles from "./Login.module.css";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const redirectToProfile = useRedirectButton('/profile');
    const redirectToSignup = useRedirectButton('/signup');

    async function handleSubmit() {
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                "username": userName,
                "password": password,
            });

            login(response.data);
            redirectToProfile();

        } catch (e) {
            console.error("Login mislukt: ", e.response);
            setPasswordError('Login failed. Please check your username and password.');
        }
    }

    function handleLoginClick() {
        if (password.length >= 6) {
            handleSubmit();
            redirectToProfile();
        } else {
            setPasswordError('Het wachtwoord moet minimaal 6 tekens lang zijn!');
        }
    }

    return (
        <>
            <form className={styles["Form"]}>
                <label className={styles["Label-Username"]} htmlFor="login-username">
                    Username:
                    <input className={styles["input-username"]}
                           type="text"
                           id="login-username"
                           onChange={(e) => setUsername(e.target.value)}
                           value={userName}
                           placeholder="Fill in your username"
                    />
                    {userName.length < 6 && <span className={styles["error-message"]}>Your username isn't long enough</span>}
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
                    {password.length < 6 && <span className={styles["error-message"]}>Your password isn't long enough</span>}
                </label>

                {passwordError && <p className={styles["password-error"]}>{passwordError}</p>}

                <button
                    className={styles["login-button"]} type="button" onClick={handleLoginClick}>
                    Login
                </button>
            </form>

            <div onClick={redirectToSignup} className={styles["signup-prompt"]}>
                Heeft u geen account? Klik dan:
                <span className={styles["styled-link"]}>Signup</span>
            </div>
        </>
    );
}

export default LoginPage;
