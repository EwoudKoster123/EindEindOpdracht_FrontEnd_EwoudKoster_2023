import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../styles/Cuisine.module.css';
import CousineSearch from "../components/CuisineSearch";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {Link, useParams} from "react-router-dom";
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

        if (keukens)
            getCuisineData();
    }, [keukens]);


    return (
        <>

            <main>
                <section>
                    <p>
                        Europees:
                        <list>
                            Eastern European, European, French, German, Greek, Irish, Italian, Nordic and
                            Spanish
                        </list>
                    </p>
                    <p>
                        Aziatisch:
                        <list>
                            Chinese, Indian, Japanese, Korean, Middle
                            Eastern, Thai and Vietnamese
                        </list>
                    </p>
                    <p>
                        Noord-Amerikaans:
                        <list>
                            Caribbean
                        </list>
                    </p>
                    <p>
                        Zuid-Amerikaans:
                        <list>
                            Latin American
                        </list>
                    </p>

                    <p>
                        Overig:
                        <list>
                            African, Mediterranean and Jewish
                        </list>
                    </p>

                </section>
                <section>
                    <CousineSearch setCuisineSearchHandler={setCuisine}/>
                </section>
                {error && <>
                    <div><p>Geen recepten gevonden. Probeer opnieuw.</p></div>
                </>}

                {cuisineData && <>

                            <div>
                                <Wrapper>
                                    <h3>Hier zijn de gevonden resultaten.</h3>
                                    <Splide options={{
                                        perPage: 4,
                                        arrows: false,
                                        pagination: false,
                                        drag: 'free',
                                        gap: "5rem"
                                    }}
                                    >
                                        {cuisineData.results.map((keukenList) => {
                                            return(
                                                <SplideSlide key={keukenList.id}>
                                                    <Card key={keukenList.id}>
                                                        <Link to={'/recipe/' + keukenList.id}>
                                                            <p className={styles["p-cuisine"]}>{keukenList.title}</p>
                                                            <img className={styles["img-cuisine"]} src={keukenList.image} alt="" />

                                                        </Link>
                                                    </Card>
                                                </SplideSlide>
                                            )
                                        })
                                        }
                                    </Splide>
                                </Wrapper>
                            </div>
                </>
                }

            </main>


        </>
    );
}

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1rf));
grid-gap: 3rem;
`;

const Wrapper = styled.div`
  margin: 4rem 0rem;
`

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
`;

export default ChooseCuisine;