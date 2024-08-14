import React from "react";
import './HomeCard.module.css'

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