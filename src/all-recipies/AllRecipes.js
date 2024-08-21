import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import Search from "../search/Search";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./AllRecipes.module.css";
import { useFetchData } from '../helpers/usefetchData';
import { ErrorMessage } from '../helpers/ErrorMessage';

/*https://api.spoonacular.com/recipes/random?apiKey=58d9ee76861142d19ae15d8da98f6abf&number=10000*/

function AllRecipes() {
    const { data: allrecipes, error } = useFetchData(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10000`,
        'allrecipes'
    );

    return (
        <main className={styles.main}>
            <div className={styles["search-container"]}>
                <Search />
            </div>
            <ErrorMessage error={error} message="Geen recepten gevonden. Probeer opnieuw." />
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
