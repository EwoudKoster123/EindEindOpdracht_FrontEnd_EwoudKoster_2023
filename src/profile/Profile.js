import React from 'react';
import './Profile.module.css';
import styles from "./Profile.module.css";

function Profile() {
    return (
        <>
            <header className={styles["HeaderProfile"]} />
            <main className={styles["MainProfile"]}>
                <h3 className={styles["WelcomeProfile"]}>Welkom op je persoonlijke pagina</h3>
                <section className={styles["SectionProfile"]}>
                    <sectiontitle className={styles["SectionTitle"]}>Het is gelukt om in te loggen. U bevindt zich op een beveiligde pagina.</sectiontitle>
                </section>
            </main>
        </>
    );
}

export default Profile;