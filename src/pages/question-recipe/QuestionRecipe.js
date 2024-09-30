import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import QuestionRecipeSearch from "../../components/question-recipesearch/QuestionRecipeSearch";
import LoadSpinner from "../../components/load-spinner/LoadSpinner";
import styles from "./QuestionRecipe.module.css"

function QuestionRecipe() {
    const [questionData, setQuestionData] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getQuestionData = async () => {
            if (question.trim() === '') {
                setError('Voer een categorie in om te zoeken.');
                return;
            }

            setError(false);
            setLoading(true);
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?type=${question}&addRecipeInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`);
                setQuestionData(result.data);
            } catch (e) {
                console.error(e);
                setError('Er is een fout opgetreden bij het laden van de recepten. Probeer het opnieuw.');
            } finally {
                setLoading(false);
            }
        };

        if (question) getQuestionData();
    }, [question]);

    return (
        <>
            <main className={styles.main}>
                <section className={styles["section-prompt"]}>
                    <p className={styles.question}>Waar heeft u zin in? Kies een categorie:</p>
                    <p className={styles.options}>
                        bread, breakfast, dessert, drink, fingerfood, snack, marinade, sauce, soup, beverage
                    </p>
                </section>

                <section className={styles["section-question"]}>
                    <QuestionRecipeSearch setQuestionHandler={setQuestion} />
                </section>

                {loading && <LoadSpinner />}

                {error && <p className={styles.error}>{error}</p>}

                {questionData && (
                    <section className={styles["results-section"]}>
                        <h2 className={styles["results-title"]}>Hier zijn de gevonden resultaten:</h2>
                        <Splide options={{
                            perPage: 4,
                            breakpoints: {
                                1024: { perPage: 3 },
                                768: { perPage: 2 },
                                480: { perPage: 1 }
                            },
                            arrows: true,
                            pagination: true,
                            drag: 'free',
                            gap: "2rem"
                        }}>
                            {questionData.results.map((recipe) => (
                                <SplideSlide key={recipe.id}>
                                    <div className={styles.card}>
                                        <Link to={`/recipe/${recipe.id}`} className={styles["styled-link"]}>
                                            <img className={styles["card-image"]} src={recipe.image} alt={recipe.title} />
                                            <h3 className={styles["card-title"]}>{recipe.title}</h3>
                                        </Link>
                                    </div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </section>
                )}
            </main>
        </>
    );
}

export default QuestionRecipe;
