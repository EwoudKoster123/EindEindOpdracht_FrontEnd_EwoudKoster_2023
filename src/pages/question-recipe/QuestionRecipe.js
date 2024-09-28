import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import QuestionRecipeSearch from "../../components/question-recipesearch/QuestionRecipeSearch";
import styles from "./QuestionRecipe.module.css"

function QuestionRecipe() {
    const [questionData, setQuestionData] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestionData = async () => {
            setError(false);
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?type=${question}&addRecipeInformation=true&apiKey=${process.env.REACT_APP_API_KEY}`);
                setQuestionData(result.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        };

        if (question) getQuestionData();
    }, [question]);

    return (
        <>
            <main className={styles.main}>
                <section className={styles["section-prompt"]}>
                    <p className={styles.question}>Waar heeft u zin in? Kies uit:</p>
                    <p className={styles.options}>bread, breakfast, dessert, drink, fingerfood, snack, marinade, sauce, soup, beverage</p>
                </section>

                <section className={styles["section-question"]}>
                    <QuestionRecipeSearch setQuestionHandler={setQuestion} />
                </section>

                {error && <p className={styles.error}>Geen recepten gevonden. Probeer het opnieuw.</p>}

                {questionData && (
                    <section className={styles["results-section"]}>
                        <h2 className={styles["results-title"]}>Hier zijn de gevonden resultaten.</h2>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
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
