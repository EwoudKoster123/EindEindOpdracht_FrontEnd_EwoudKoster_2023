import React, {useState} from 'react';
import styles from './FridgeRecipeSearch.module.css';

function SearchBarFridge({setFrigdeHandler}) {
    const [fridge, setFridge] = useState('');

    function onFormSubmit(e) {
        e.preventDefault();
        setFrigdeHandler(fridge);
    }

    return (
        <form className={styles["form-style"]} onSubmit={onFormSubmit}>
            <input className={styles["input-fridge"]}
                type="text"
                name="search"
                value={fridge}
                onChange={(e) => setFridge(e.target.value)}
                placeholder="Wat is in uw koelkast?"
            />
        </form>
    );
}

export default SearchBarFridge;