import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import {Link} from "react-router-dom";
import Search from "../components/Search";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "../styles/AllRecipes.module.css"


function AllRecipes() {
    const [allrecipes, setAllRecipes] = useState([]);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        getAllRecipes();
    }, []);

    const getAllRecipes = async () => {
        try {
            const check = localStorage.getItem('allrecipes');

            if (check) {
                setAllRecipes(JSON.parse(check));
            } else {
                const api = await fetch('https://api.spoonacular.com/recipes/random?apiKey=58d9ee76861142d19ae15d8da98f6abf&number=10000')
                const data = await api.json();
                localStorage.setItem('allrecipes', JSON.stringify(data.allrecipes));
                setAllRecipes(data.allrecipes)
            }
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

    };

    return (
        <main>
            <div>
                <Search />
                {error && <> <p>Geen recepten gevonden. Probeer opnieuw.</p> </> }
                <Wrapper>
                    <h3> Alle Recepten </h3>
                    <Splide options={{

                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: "5rem",
                    }}
                    >
                        {allrecipes.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <Link to={'/recipe/' + recipe.id}>
                                            <p className={styles["p-allrecipes"]}>{recipe.title}</p>
                                            <img className={styles["img-allrecipes"]} src={recipe.image} alt={recipe.title}/>
                                            <Gradient />
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </Wrapper>
            </div>
        </main>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div` 
      min-height: 25rem;
      border-radius: 2rem;
      overflow: hidden;
      position: relative;
    `;

const Gradient = styled.div `
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(1,0,0,0.5));
`

export default AllRecipes;
