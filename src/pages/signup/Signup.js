import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from "./Signup.module.css";

const UserContext = createContext();

function Signup() {
    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setRole] = useState('');
    const history = useHistory();
    const { setUserDetails } = useContext(UserContext); // Toegang tot de context

    const SignUpUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: userName,
                email: email,
                password: password,
                role: [user]
            });
            console.log(response);

            setUserDetails({
                username: userName,
                email: email,
                role: user,
                token: response.data.accessToken,
            });
            history.push('/profile');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    function handleRegisterClick(e) {
        e.preventDefault();
        if (password.length >= 6) {
            SignUpUser(e);
        } else {
            console.error('Het wachtwoord moet minimaal 6 tekens lang zijn!');
        }
    }

    return (
        <div className={styles["SignupContainer"]}>
            <h2 className={styles["SignupHeader"]}>Aanmelden</h2>
            <form className={styles["SignupForm"]} onSubmit={SignUpUser}>
                <label className={styles["SignupLabel"]} htmlFor="email">
                    Email:
                    <input
                        className={styles["SignupInput"]}
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Vul je email in"
                    />
                </label>
                <label className={styles["SignupLabel"]} htmlFor="username">
                    Username:
                    <input
                        className={styles["SignupInput"]}
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        placeholder="Vul je gebruikersnaam in"
                    />
                    {userName.length < 6 && <p className={styles["ErrorMessage"]}>Je gebruikersnaam is niet lang genoeg</p>}
                    {userName.length >= 6 && <p className={styles["GoodMessage"]}>Je gebruikersnaam is lang genoeg</p>}
                </label>
                <label className={styles["SignupLabel"]} htmlFor="password">
                    Password:
                    <input
                        className={styles["SignupInput"]}
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Vul je wachtwoord in"
                    />
                    {password.length < 6 && <p className={styles["ErrorMessage"]}>Je wachtwoord is niet lang genoeg</p>}
                    {password.length >= 6 && <p className={styles["GoodMessage"]}>Je wachtwoord is lang genoeg</p>}
                </label>
                <label className={styles["SignupLabel"]} htmlFor="role">
                    Role:
                    <input
                        className={styles["SignupInput"]}
                        type="text"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={user}
                        placeholder="gebruiker of admin"
                    />
                </label>
                <button className={styles["SignupButton"]} type="submit" onClick={handleRegisterClick}>Register</button>
            </form>
        </div>
    );
}

function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
}

function App() {
    return (
        <UserProvider>
            <Signup />
        </UserProvider>
    );
}

export default App;
