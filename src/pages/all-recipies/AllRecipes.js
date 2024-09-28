import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./AllRecipes.module.css";
import axios from 'axios';
import { ErrorMessage } from '../../helpers/ErrorMessage';

function AllRecipes() {
    const [ingredient, setIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const fetchAllRecipes = async () => {
        setError(null);
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/random?number=50&apiKey=${process.env.REACT_APP_API_KEY}`
            );
            setRecipes(response.data.recipes);
        } catch (e) {
            setError("Er ging iets mis bij het ophalen van de recepten.");
        }
    };

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    const fetchRecipesByIngredient = async () => {
        setError(null);
        if (ingredient) {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&apiKey=${process.env.REACT_APP_API_KEY}`
                );
                setRecipes(response.data);
                if (response.data.length === 0) {
                    setError("Geen recepten gevonden met het ingrediënt.");
                }
            } catch (e) {
                setError("Er ging iets mis bij het zoeken naar recepten.");
            }
        } else {
            fetchAllRecipes();
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipesByIngredient();
    };

    return (
        <main className={styles.main}>
            <div className={styles["search-container"]}>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Zoek op ingrediënt..."
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
                    <button type="submit">Zoeken</button>
                </form>
            </div>

            {error && (
                <ErrorMessage error={error} message={error} />
            )}

            <div className={styles.wrapper}>
                <h3 className={styles.title}>
                    {ingredient ? `Recepten met: ${ingredient}` : "Alle Recepten"}
                </h3>
                {recipes.length > 0 ? (
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
                        {recipes.map((recipe) => (
                            <SplideSlide key={recipe.id}>
                                <div className={styles.card}>
                                    <Link to={`/recipe/${recipe.id}`}>
                                        <img className={styles["img-allrecipes"]} src={recipe.image} alt={recipe.title} />
                                        <div className={styles.gradient} />
                                        <p className={styles["p-allrecipes"]}>{recipe.title}</p>
                                    </Link>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                ) : (
                    ingredient && !error && <p>Geen recepten gevonden. Probeer een ander ingrediënt.</p>
                )}
            </div>
        </main>
    );
}

export default AllRecipes;
