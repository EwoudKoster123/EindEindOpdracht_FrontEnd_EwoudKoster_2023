import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import './Popular.module.css';
import styles from "../login/Login.module.css";
import {Link} from "react-router-dom";

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

function Popular() {
    const [popular, setPopular] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    const fetchPopularRecipes = async () => {
        try {
            const cachedRecipes = localStorage.getItem('popular');
            if (cachedRecipes) {
                setPopular(JSON.parse(cachedRecipes));
            } else {
                const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=9`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                localStorage.setItem('popular', JSON.stringify(data.recipes));
                setPopular(data.recipes);
            }
        } catch (error) {
            console.error('Fetching popular recipes failed:', error);
            setError(true);
        }
    };

    return (
        <container className={styles["container"]}>
            {error && <errormessage className={styles["error-message"]}>Geen recepten gevonden. Probeer opnieuw.</errormessage>}
            <wrapper className={styles["wrapper"]}>
                <h3 className={styles["title"]}>Populaire keuzes</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: "2rem",
                }}>
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <card className={styles["card-popular"]}>
                                <StyledLink className={styles["styled-link"]} to={'/recipe/' + recipe.id}>
                                    <RecipeTitle className={styles["recipe-title"]}>{recipe.title}</RecipeTitle>
                                    <RecipeImage className={styles["recipe-image"]} src={recipe.image} alt={recipe.title} />
                                    <gradient className={styles["gradient-popular"]} />
                                </StyledLink>
                            </card>
                        </SplideSlide>
                    ))}
                </Splide>
            </wrapper>
        </container>
    );
}

const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    height: 100%;
`;

const RecipeTitle = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    text-align: center;
    font-size: 1.2rem;
`;

const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default Popular;