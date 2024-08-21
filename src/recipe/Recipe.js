import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import styles from "./Recipe.module.css";

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    const [error, toggleError] = useState(false);



    const fetchDetails = async () => {
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            const detailData = await data.json();
            setDetails(detailData);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);



    return (
        <div className={styles["detail-wrapper"]}>
            {error && <p className={styles["error-message"]}>Recept niet gevonden.</p>}
            <div className={styles["image-container"]}>
                <h2 className={styles["h2-recipe"]}>{details.title}</h2>
                <img src={details.image} alt={details.title} className={styles["recipe-image"]} />
            </div>
            <div className={styles["info"]}>
                <button
                    className={`${styles["tab-button"]} ${activeTab === 'instructions' ? styles["active"] : ''}`}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </button>
                <button
                    className={`${styles["tab-button"]} ${activeTab === 'ingredients' ? styles["active"] : ''}`}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </button>

                {activeTab === 'instructions' && (
                    <div className={styles["tab-content"]}>
                        <h3 className={styles["recipe-summary"]} dangerouslySetInnerHTML={{ __html: details.summary }} />
                        <h3 className={styles["recipe-instructions"]} dangerouslySetInnerHTML={{ __html: details.instructions }} />
                    </div>
                )}

                {activeTab === 'ingredients' && (
                    <ul className={styles["ingredient-list"]}>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id} className={styles["ingredient-item"]}>
                                {ingredient.original}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Recipe;
