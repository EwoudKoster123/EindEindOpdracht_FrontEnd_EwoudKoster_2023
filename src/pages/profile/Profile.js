import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./Profile.module.css"

function Profile() {
    const history = useHistory();

    const [email, setEmail] = useState(localStorage.getItem('email') || setEmail);
    const [username, setUsername] = useState(localStorage.getItem('username') || setUsername);
    const [password, setPassword] = useState(localStorage.getItem('password') || setPassword);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('email', email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    useEffect(() => {
        localStorage.setItem('password', password);
    }, [password]);

    const goToHomePage = () => {
        history.push('/');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <header className={styles["HeaderProfile"]} />
            <main className={styles["MainProfile"]}>
                <h3 className={styles["WelcomeProfile"]}>Welkom op je persoonlijke pagina</h3>
                <section className={styles["SectionProfile"]}>
                    <sectiontitle className={styles["SectionTitle"]}>
                        Het is gelukt om in te loggen. U bevindt zich op een beveiligde pagina.
                    </sectiontitle>
                    <div className={styles["ProfileInfo"]}>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Username:</strong> {username}</p>
                        <p>
                            <strong>Password:</strong>
                            <span>{passwordVisible ? password : '•'.repeat(password.length)}</span>
                            <button
                                className={styles["toggle-password-button"]}
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? 'Verberg' : 'Bekijk'}
                            </button>
                        </p>
                    </div>
                </section>
                <button className={styles["redirect-button"]} onClick={goToHomePage}>
                    Naar Homepagina
                </button>
            </main>
        </>
    );
}

export default Profile;

/* dit is tekst voor de pullrequest!!! */
