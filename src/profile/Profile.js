import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Profile.module.css';

function Profile() {
    const history = useHistory();

    const goToHomePage = () => {
        history.push('/');
    };

    return (
        <>
            <header className={styles["HeaderProfile"]} />
            <main className={styles["MainProfile"]}>
                <h3 className={styles["WelcomeProfile"]}>Welkom op je persoonlijke pagina</h3>
                <section className={styles["SectionProfile"]}>
                    <sectiontitle className={styles["SectionTitle"]}>Het is gelukt om in te loggen. U bevindt zich op een beveiligde pagina.</sectiontitle>
                </section>
                <button className={styles["redirect-button"]} onClick={goToHomePage}>Naar Homepagina</button>
            </main>
        </>
    );
}

export default Profile;
