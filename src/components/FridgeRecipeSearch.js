import React, {useState} from 'react';
import styles from '../styles/FridgeRecipeSearch.module.css';
import styled from "styled-components";

function SearchBarFridge({setFrigdeHandler}) {
    const [fridge, setFridge] = useState('');

    function onFormSubmit(e) {
        e.preventDefault();
        setFrigdeHandler(fridge);
    }

    return (
        <FormStyle onSubmit={onFormSubmit}>
            <input className={styles["input-fridge"]}
                type="text"
                name="search"
                value={fridge}
                onChange={(e) => setFridge(e.target.value)}
                placeholder="Wat is in uw koelkast?"
            />
        </FormStyle>
    );
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  `

export default SearchBarFridge;