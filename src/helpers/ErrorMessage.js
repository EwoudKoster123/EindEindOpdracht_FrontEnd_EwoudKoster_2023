import React from 'react';
import styles from './ErrorMessage.css';

export function ErrorMessage({ error, message }) {
    if (!error) return null;

    return <p className={styles["Error-Message"]}>{message}</p>;
}
