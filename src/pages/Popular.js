import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
// import "../styles/Popular.css"; // Verplaats CSS naar een specifiek bestand

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
        <Container>
            {error && <ErrorMessage>Geen recepten gevonden. Probeer opnieuw.</ErrorMessage>}
            <Wrapper>
                <Title>Populaire keuzes</Title>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: "2rem",
                }}>
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <StyledLink to={'/recipe/' + recipe.id}>
                                    <RecipeTitle>{recipe.title}</RecipeTitle>
                                    <RecipeImage src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </StyledLink>
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Wrapper>
        </Container>
    );
}

// Styled components
const Container = styled.div`
  padding: 2rem 0;
  background: #f9f9f9;
`;

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 1200px;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

const Card = styled.div`
    min-height: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

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
    color: #fff;
    text-align: center;
    font-size: 1.2rem;
`;

const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Gradient = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const ErrorMessage = styled.p`
    text-align: center;
    color: red;
    font-weight: bold;
`;

export default Popular;