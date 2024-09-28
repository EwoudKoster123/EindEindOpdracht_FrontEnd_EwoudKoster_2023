import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import FridgeCard from "../../components/fridecard/FridgeCard";
import whats_in_the_fridge from "../../assets/whats_in_the_fridge.png";
import "./FridgeRecipe.module.css"

function FridgePage() {
    const [fridgeData, setFridgeData] = useState(null);
    const [koelkast, setKoelkast] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [error, setError] = useState(false);

    const addIngredient = (e) => {
        e.preventDefault();
        if (ingredient && !koelkast.includes(ingredient.toLowerCase())) {
            setKoelkast((prevState) => [...prevState, ingredient.toLowerCase()]);
        }
        setIngredient('');
    };

    const removeIngredient = (ingredientToRemove) => {
        setKoelkast((prevState) => prevState.filter((ingr) => ingr !== ingredientToRemove));
    };

    useEffect(() => {
        const getFridgeData = async () => {
            setError(false);
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${koelkast.join(',')}&number=9&apiKey=${process.env.REACT_APP_API_KEY}`);
                setFridgeData(result.data);
                if (result.data.length === 0) {
                    throw new Error("No recipes found");
                }
            } catch (e) {
                console.error(e);
                setError(true);
            }
        };

        if (koelkast.length > 0) getFridgeData();
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
                    <form onSubmit={addIngredient}>
                        <input
                            type="text"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            placeholder="Voeg een ingrediënt toe"
                        />
                        <button type="submit">Toevoegen</button>
                    </form>
                </section>

                <section className="section">
                    <h3>In uw koelkast:</h3>
                    <ul>
                        {koelkast.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button onClick={() => removeIngredient(item)}>Verwijderen</button>
                            </li>
                        ))}
                    </ul>
                </section>

                {error && (
                    <p className="error-message">Er zijn geen recepten gevonden. Probeer het opnieuw.</p>
                )}

                {fridgeData && (
                    <div className="results">
                        <h3 className="results-title">Hier zijn de gevonden resultaten op basis van uw koelkast.</h3>
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
                            className="splide"
                        >
                            {fridgeData.map((recipe) => (
                                <SplideSlide key={recipe.id}>
                                    <div className="card">
                                        <Link to={`/recipe/${recipe.id}`}>
                                            <img className="img-fridge-recipes" src={recipe.image} alt={recipe.title} />
                                            <div className="gradient" />
                                            <p className="p-fridge-recipes">{recipe.title}</p>
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
