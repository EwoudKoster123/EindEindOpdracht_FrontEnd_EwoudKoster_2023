import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import Search from "../components/Search";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "../styles/AllRecipes.module.css";

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
        <main>
            <div>
                <Search />
                {error && <p>Geen recepten gevonden. Probeer opnieuw.</p>}
                <Wrapper>
                    <h3>Alle Recepten</h3>
                    <Splide options={{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: "5rem",
                    }}>
                        {allrecipes.map((recipe) => (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p className={styles["p-allrecipes"]}>{recipe.title}</p>
                                        <img className={styles["img-allrecipes"]} src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        ))}
                    </Splide>
                </Wrapper>
            </div>
        </main>
    );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default AllRecipes;