import React, { useState } from "react";
import styles from "./QuestionRecipeSearch.module.css"

function QuestionRecipeSearch({ setQuestionHandler }) {

    const [question, setQuestion] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setQuestionHandler(question);
    };

    return (
        <form className={styles["FormStyle"]} onSubmit={submitHandler}>
            <input
                className={styles["input-question"]}
                type="text"
                name="search"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ik heb zin in..."
            />
        </form>
    );
}

export default QuestionRecipeSearch;
