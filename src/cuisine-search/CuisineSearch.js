import React, {useState} from 'react';
import styles from './CuisineSearch.module.css';
import './CuisineSearch.module.css';

function SearchBar({setCuisineSearchHandler}) {
    const [cuisine, setCuisine] = useState('');

    function onFormSubmit(e) {
        e.preventDefault();
        console.log('submitted!');
        setCuisineSearchHandler(cuisine);
    }

    return (
        <form onSubmit={onFormSubmit} className={styles["form-style"]}>
            <div className={styles["div-cuisine"]}>
                <input className={styles["input-cuisine"]} onChange={(e) => setCuisine(e.target.value)} type="text" value={cuisine}
                       placeholder="Welke keuken wilt u hebben? Kies uit de keuzes hierboven." />
            </div>
        </form>
    )
}

export default SearchBar;