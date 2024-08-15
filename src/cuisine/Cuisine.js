import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CuisineSearch from "../cuisine-search/CuisineSearch";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import './Cuisine.module.css';


function Cuisine() {
    const [cuisineData, setCuisineData] = useState(null);
    const [keukens, setCuisine] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function getCuisineData() {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${keukens}&addRecipeInformation=true&apiKey=58d9ee76861142d19ae15d8da98f6abf`);
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
        <>
            <main className="main">
                <section className="cuisine-section">
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
                </section>
                <section className="search-section">
                    <CuisineSearch setCuisineSearchHandler={setCuisine} />
                </section>
                {error && <p className="error-message">Geen recepten gevonden. Probeer opnieuw.</p>}
                {cuisineData && (
                    <section className="result-section">
                        <div className="wrapper">
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
                                        <div className="card">
                                            <Link to={'/recipe/' + keukenList.id}>
                                                <p className="recipe-title">{keukenList.title}</p>
                                                <img className="recipe-image" src={keukenList.image} alt={keukenList.title} />
                                            </Link>
                                        </div>
                                    </SplideSlide>
                                ))}
                            </Splide>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}

const CuisineCategory = ({ title, cuisines }) => (
    <p className="cuisine-paragraph">
        {title}:
        <ul className="cuisine-list">
            <li className="cuisine-item">
                {cuisines.map(cuisine => (
                    <span key={cuisine}>{cuisine}, </span>
                ))}
            </li>
        </ul>
    </p>
);

export default Cuisine;
