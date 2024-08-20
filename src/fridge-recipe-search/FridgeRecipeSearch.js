import React, {useState} from 'react';
import styles from './FridgeRecipeSearch.module.css';
import styled from "styled-components";

function SearchBarFridge({setFrigdeHandler}) {
    const [fridge, setFridge] = useState('');

    function onFormSubmit(e) {
        e.preventDefault();
        setFrigdeHandler(fridge);
    }

    return (
        <formstyle className={styles["form-style"]} onSubmit={onFormSubmit}>
            <input className={styles["input-fridge"]}
                type="text"
                name="search"
                value={fridge}
                onChange={(e) => setFridge(e.target.value)}
                placeholder="Wat is in uw koelkast?"
            />
        </formstyle>
    );
}

export default SearchBarFridge;