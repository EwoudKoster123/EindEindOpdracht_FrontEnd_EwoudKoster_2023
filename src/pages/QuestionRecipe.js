import React, {useState, useEffect} from 'react';
import axios from "axios";
import styles from '../styles/QuestionRecipe.module.css';
import QuestionRecipeSearch from "../components/QuestionRecipeSearch";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {Link} from "react-router-dom";
import styled from "styled-components";

function QuestionRecipe() {
    const [questionData, setQuestionData] = useState(null);
    const [question, setQuestion] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function getQuestionData() {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&type=${question}&addRecipeInformation=true&apiKey=58d9ee76861142d19ae15d8da98f6abf`);
                console.log(result.data);
                setQuestionData(result.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (question)
            getQuestionData();
    }, [question]);


    return (
        <>

            <main>
                <section>
                    <p>Waar heeft u zin in? Kies uit:</p>
                </section>
                <section>
                    <p>bread, breakfast, dessert, drink, fingerfood snack, marinade, sauce, soup beverage</p>
                </section>
                <section>
                    <QuestionRecipeSearch setQuestionHandler={setQuestion}/>
                </section>

                {error && <><div><p>Geen recepten gevonden. Probeer het opnieuw.</p></div></> }

                {questionData && <>
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
                                {questionData.results.map((questionlist) => {
                                    return(
                                        <SplideSlide key={questionlist.id}>
                                            <Card key={questionlist.id}>
                                                <Link to={'/recipe/' + questionlist.id}>
                                                    <p className={styles["p-question"]}>{questionlist.title}</p>
                                                    <img className={styles["img-question"]} src={questionlist.image} alt="" />

                                                </Link>
                                            </Card>
                                        </SplideSlide>
                                    )
                                })}
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

export default QuestionRecipe;