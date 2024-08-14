import React, { useState, useEffect } from 'react';
import axios from "axios";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import QuestionRecipeSearch from "../components/QuestionRecipeSearch";
import './QuestionRecipe.module.css';
import './QuestionRecipeSearch.module.css';

function QuestionRecipe() {
    const [questionData, setQuestionData] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const getQuestionData = async () => {
            setError(false);
            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?type=${question}&addRecipeInformation=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
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
            <Main>
                <Section>
                    <Prompt>Waar heeft u zin in? Kies uit:</Prompt>
                    <Options>bread, breakfast, dessert, drink, fingerfood snack, marinade, sauce, soup, beverage</Options>
                </Section>
                <Section>
                    <QuestionRecipeSearch setQuestionHandler={setQuestion} />
                </Section>

                {error && <ErrorMessage>Geen recepten gevonden. Probeer het opnieuw.</ErrorMessage>}

                {questionData && (
                    <ResultsSection>
                        <ResultsTitle>Hier zijn de gevonden resultaten.</ResultsTitle>
                        <Splide options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }}>
                            {questionData.results.map((recipe) => (
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
                    </ResultsSection>
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

const Prompt = styled.p`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
`;

const Options = styled.p`
    font-size: 1.2rem;
    color: #666;
    text-align: center;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    font-weight: bold;
`;

const ResultsSection = styled.div`
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

export default QuestionRecipe;
