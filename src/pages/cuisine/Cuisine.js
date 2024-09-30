import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import CuisineSearch from "../../components/cuisine-search/CuisineSearch";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./Cuisine.module.css"

function Cuisine() {
    const [cuisineData, setCuisineData] = useState(null);
    const [keukens, setCuisine] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCuisineData() {
            setError(false);
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${keukens}&addRecipeInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`
                );
                if (response.data.results.length === 0) {
                    setError(true);
                } else {
                    setCuisineData(response.data);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            }
        }

        if (keukens) {
            fetchCuisineData();
        }
    }, [keukens]);

    return (
        <main className={styles.main}>
            <section className={styles["cuisine-section"]}>
                <div className={styles["cuisine-grid"]}>
                    <CuisineCategory title="Europees" cuisines={["Eastern European", "European", "French", "German", "Greek", "Irish", "Italian", "Nordic", "Spanish"]} />
                    <CuisineCategory title="Aziatisch" cuisines={["Chinese", "Indian", "Japanese", "Korean", "Middle Eastern", "Thai", "Vietnamese"]} />
                    <CuisineCategory title="Noord-Amerikaans" cuisines={["Caribbean"]} />
                    <CuisineCategory title="Zuid-Amerikaans" cuisines={["Latin American"]} />
                    <CuisineCategory title="Overig" cuisines={["African", "Mediterranean", "Jewish"]} />
                </div>
            </section>

            <section className={styles["search-section"]}>
                <CuisineSearch setCuisineSearchHandler={setCuisine} />
            </section>

            {error && <p className={styles["error-message"]}>Geen recepten gevonden. Probeer opnieuw.</p>}

            {cuisineData && (
                <section className={styles["result-section"]}>
                    <div className={styles.wrapper}>
                        <h3>Gevonden resultaten</h3>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem",
                            breakpoints: {
                                768: { perPage: 2, gap: "1rem" },
                                576: { perPage: 1, gap: "1rem" }
                            },
                        }}>
                            {cuisineData.results.map((recipe) => (
                                <SplideSlide key={recipe.id}>
                                    <div className={styles.card}>
                                        <Link to={`/recipe/${recipe.id}`}>
                                            <p className={styles["recipe-title"]}>{recipe.title}</p>
                                            <img className={styles["recipe-image"]} src={recipe.image} alt={recipe.title} />
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
        <h4>{title}</h4>
        <ul className={styles["cuisine-list"]}>
            {cuisines.map(cuisine => (
                <li key={cuisine} className={styles["cuisine-item"]}>{cuisine}</li>
            ))}
        </ul>
    </div>
);

export default Cuisine;
