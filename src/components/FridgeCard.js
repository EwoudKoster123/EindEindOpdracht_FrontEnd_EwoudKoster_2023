import React from "react";
import styles from '../homecard/HomeCard.module.css'

function FridgeCard ({image}) {
    return (
        <>

            <article>
                <img src={image}/>
            </article>

        </>

    );
}

export default FridgeCard;