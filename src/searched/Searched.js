import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Search from "../search/Search";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./Searched.module.css";  // We gebruiken CSS-modules

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [error, toggleError] = useState(false);
    let params = useParams();

    const getSearched = async (name) => {
        try {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}f&query=${name}`
            );
            const recipes = await data.json();
            setSearchedRecipes(recipes.results);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

    return (
        <div>
            <Search />
            {error && <p className={styles["error-message"]}>Geen recepten gevonden. Probeer opnieuw.</p>}
            <div className={styles["wrapper"]}>
                <h3 className={styles["title"]}>Hier zijn de gevonden resultaten.</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: "5rem"
                }}>
                    {searchedRecipes.map((item) => (
                        <SplideSlide key={item.id}>
                            <div className={styles["card"]}>
                                <Link to={'/recipe/' + item.id}>
                                    <p className={styles["p-searched"]}>{item.title}</p>
                                    <img className={styles["img-searched"]} src={item.image} alt={item.title} />
                                </Link>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}

export default Searched;
