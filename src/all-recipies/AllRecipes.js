import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import Search from "../search/Search";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./AllRecipes.module.css";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

function AllRecipes() {
    const [allrecipes, setAllRecipes] = useState([]);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const check = localStorage.getItem('allrecipes');
                if (check) {
                    setAllRecipes(JSON.parse(check));
                } else {
                    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10000`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    localStorage.setItem('allrecipes', JSON.stringify(data.recipes));
                    setAllRecipes(data.recipes);
                }
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        };

        getAllRecipes();
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles["search-container"]}>
                <Search />
            </div>
            {error && <p className={styles.error}>Geen recepten gevonden. Probeer opnieuw.</p>}
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Alle Recepten</h3>
                <Splide
                    options={{
                        perPage: 4,
                        arrows: true,
                        pagination: false,
                        drag: 'free',
                        gap: "2rem",
                        breakpoints: {
                            768: {
                                perPage: 1,
                                gap: '1rem',
                            },
                        },
                    }}
                    className={styles.splide}
                >
                    {allrecipes.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <div className={styles.card}>
                                <Link to={'/recipe/' + recipe.id}>
                                    <img className={styles["img-allrecipes"]} src={recipe.image} alt={recipe.title} />
                                    <div className={styles.gradient} />
                                    <p className={styles["p-allrecipes"]}>{recipe.title}</p>
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </main>
    );
}

export default AllRecipes;
