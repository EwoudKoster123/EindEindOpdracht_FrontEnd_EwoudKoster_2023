import React from "react";
import styles from '../styles/HomeCard.module.css'

function HomeCard ({title, image, description}) {
    return (
        <>

            <article>
                <p>{title}</p>
                <img src={image} alt={description} />
            </article>

        </>

    );
}

export default HomeCard;