import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import FridgeRecipeSearch from "../fridge-recipe-search/FridgeRecipeSearch.js";
import FridgeCard from "../components/FridgeCard";
import whats_in_the_fridge from "../assets/whats_in_the_fridge.png";
import "./FridgeRecipe.module.css";

function FridgePage() {
    const [fridgeData, setFridgeData] = useState(null);
    const [koelkast, setKoelkast] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const getFridgeData = async () => {
            setError(false);
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${koelkast}&number=9&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
                setFridgeData(result.data);
                if (result.data.length === 0) {
                    throw new Error("No recipes found");
                }
            } catch (e) {
                console.error(e);
                setError(true);
            }
        };

        if (koelkast) getFridgeData();
    }, [koelkast]);

    return (
        <>
            <main className="main">
                <section className="section">
                    <h1 className="title">Wat heeft u nog in de koelkast?</h1>
                </section>
                <section className="section">
                    <FridgeCard image={whats_in_the_fridge} />
                </section>
                <section className="section">
                    <FridgeRecipeSearch setFridgeHandler={setKoelkast} />
                </section>

                {error && (
                    <p className="error-message">Er zijn geen recepten gevonden. Probeer het opnieuw.</p>
                )}

                {fridgeData && (
                    <div className="results">
                        <h3 className="results-title">Hier zijn de gevonden resultaten.</h3>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }}>
                            {fridgeData.map((recipe) => (
                                <SplideSlide key={recipe.id}>
                                    <div className="card">
                                        <Link className="styled-link" to={`/recipe/${recipe.id}`}>
                                            <p className="card-title">{recipe.title}</p>
                                            <img className="card-image" src={recipe.image} alt={recipe.title} />
                                        </Link>
                                    </div>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </div>
                )}
            </main>
        </>
    );
}

export default FridgePage;
