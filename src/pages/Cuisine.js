import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CuisineSearch from "../components/CuisineSearch";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ChooseCuisine() {
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
            <Main>
                <CuisineSection>
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
                </CuisineSection>
                <SearchSection>
                    <CuisineSearch setCuisineSearchHandler={setCuisine} />
                </SearchSection>
                {error && <ErrorMessage>Geen recepten gevonden. Probeer opnieuw.</ErrorMessage>}
                {cuisineData && (
                    <ResultSection>
                        <Wrapper>
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
                                        <Card>
                                            <Link to={'/recipe/' + keukenList.id}>
                                                <RecipeTitle>{keukenList.title}</RecipeTitle>
                                                <RecipeImage src={keukenList.image} alt={keukenList.title} />
                                            </Link>
                                        </Card>
                                    </SplideSlide>
                                ))}
                            </Splide>
                        </Wrapper>
                    </ResultSection>
                )}
            </Main>
        </>
    );
}

const CuisineCategory = ({ title, cuisines }) => (
    <CuisineParagraph>
        {title}:
        <CuisineList>
            <CuisineItem>
                {cuisines.map(cuisine => (
                    <span key={cuisine}>{cuisine}, </span>
                ))}
            </CuisineItem>
        </CuisineList>
    </CuisineParagraph>
);

const Main = styled.main`
  padding: 2rem;
`;

const CuisineSection = styled.section`
  margin-bottom: 2rem;
`;

const SearchSection = styled.section`
    margin-bottom: 2rem;
`;

const ResultSection = styled.section``;

const CuisineParagraph = styled.p`
    margin: 1rem 0;
`;

const CuisineList = styled.ul`
    list-style: none;
    padding: 0;
`;

const CuisineItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
`;

const RecipeTitle = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #333;
`;

const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 1rem;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

export default ChooseCuisine;
