import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CuisineSearch from "../cuisine-search/CuisineSearch";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./Cuisine.module.css";

function Cuisine() {
    const [cuisineData, setCuisineData] = useState(null);
    const [keukens, setCuisine] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function getCuisineData() {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${keukens}&addRecipeInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`);
                console.log(result.data);
                setCuisineData(result.data);

                if (result.data.results.length === 0) {
                    throw new SyntaxError(error);
                }

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (keukens) getCuisineData();
    }, [keukens]);

    return (
        <main className={styles.main}>
            <section className={styles["cuisine-section"]}>
                <div className={styles["cuisine-grid"]}>
                    <CuisineCategory title="Europees" cuisines={[
                        "Eastern European", "European", "French", "German", "Greek", "Irish", "Italian", "Nordic", "Spanish"
                    ]} />
                    <CuisineCategory title="Aziatisch" cuisines={[
                        "Chinese", "Indian", "Japanese", "Korean", "Middle Eastern", "Thai", "Vietnamese"
                    ]} />
                    <CuisineCategory title="Noord-Amerikaans" cuisines={[
                        "Caribbean"
                    ]} />
                    <CuisineCategory title="Zuid-Amerikaans" cuisines={[
                        "Latin American"
                    ]} />
                    <CuisineCategory title="Overig" cuisines={[
                        "African", "Mediterranean", "Jewish"
                    ]} />
                </div>
            </section>

            <section className={styles["search-section"]}>
                <CuisineSearch setCuisineSearchHandler={setCuisine} />
            </section>

            {error && <p className={styles["error-message"]}>Geen recepten gevonden. Probeer opnieuw.</p>}

            {cuisineData && (
                <section className={styles["result-section"]}>
                    <div className={styles.wrapper}>
                        <h3>Hier zijn de gevonden resultaten.</h3>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            gap: "5rem"
                        }}>
                            {cuisineData.results.map((keukenList) => (
                                <SplideSlide key={keukenList.id}>
                                    <div className={styles.card}>
                                        <Link to={'/recipe/' + keukenList.id}>
                                            <p className={styles["recipe-title"]}>{keukenList.title}</p>
                                            <img className={styles["recipe-image"]} src={keukenList.image} alt={keukenList.title} />
                                        </Link>
                                    </div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                </section>
            )}
        </main>
    );
}

const CuisineCategory = ({ title, cuisines }) => (
    <div className={styles["cuisine-category"]}>
        <p className={styles["cuisine-paragraph"]}>{title}</p>
        <ul className={styles["cuisine-list"]}>
            {cuisines.map(cuisine => (
                <li key={cuisine} className={styles["cuisine-item"]}>{cuisine}</li>
            ))}
        </ul>
    </div>
);

export default Cuisine;
