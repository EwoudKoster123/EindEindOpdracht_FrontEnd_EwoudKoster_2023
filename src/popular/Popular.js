import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './Popular.module.css';
import { Link } from 'react-router-dom';
import styles from './Popular.module.css';

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
                const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=58d9ee76861142d19ae15d8da98f6abf`);
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
        <div className={styles.container}>
            {error && <p className={styles.errorMessage}>Geen recepten gevonden. Probeer opnieuw.</p>}
            <div className={styles.wrapper}>
                <h3 className={styles.title}>Populaire keuzes</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: true,
                    pagination: false,
                    drag: 'free',
                    gap: '2rem',
                    breakpoints: {
                        768: {
                            perPage: 2,
                        },
                        480: {
                            perPage: 1,
                        },
                    },
                }}>
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <div className={styles.cardPopular}>
                                <Link className={styles.styledLink} to={'/recipe/' + recipe.id}>
                                    <p className={styles.recipeTitle}>{recipe.title}</p>
                                    <img className={styles.recipeImage} src={recipe.image} alt={recipe.title} />
                                    <div className={styles.gradientPopular} />
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}

export default Popular;
