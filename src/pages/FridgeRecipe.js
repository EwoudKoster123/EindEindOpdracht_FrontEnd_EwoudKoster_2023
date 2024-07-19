import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import FridgeRecipeSearch from "../components/FridgeRecipeSearch.js";
import FridgeCard from "../components/FridgeCard";
import whats_in_the_fridge from "../assets/whats_in_the_fridge.png";

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
            <Main>
                <Section>
                    <Title>Wat heeft u nog in de koelkast?</Title>
                </Section>
                <Section>
                    <FridgeCard image={whats_in_the_fridge} />
                </Section>
                <Section>
                    <FridgeRecipeSearch setFridgeHandler={setKoelkast} />
                </Section>

                {error && (
                    <ErrorMessage>Er zijn geen recepten gevonden. Probeer het opnieuw.</ErrorMessage>
                )}

                {fridgeData && (
                    <Results>
                        <ResultsTitle>Hier zijn de gevonden resultaten.</ResultsTitle>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }}>
                            {fridgeData.map((recipe) => (
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <StyledLink to={`/recipe/${recipe.id}`}>
                                            <CardTitle>{recipe.title}</CardTitle>
                                            <CardImage src={recipe.image} alt={recipe.title} />
                                        </StyledLink>
                                    </Card>
                                </SplideSlide>
                            ))}
                        </Splide>
                    </Results>
                )}
            </Main>
        </>
    );
}

// Styled components
const Main = styled.main`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #333;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    font-weight: bold;
`;

const Results = styled.div`
    margin-top: 2rem;
`;

const ResultsTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
    text-align: center;
`;

const Card = styled.div`
    min-height: 25rem;
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

const CardTitle = styled.p`
    font-size: 1rem;
    margin: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
`;

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export default FridgePage;
