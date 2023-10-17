import React, {useState} from "react";
import styles from '../styles/QuestionRecipeSearch.module.css'
import styled from "styled-components";

function QuestionRecipeSearch({setQuestionHandler}) {

    const [question, setQuestion] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setQuestionHandler(question);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <input className={styles["input-question"]}
                type="text"
                name="search"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ik heb zin in..."
            />
        </FormStyle>
    )
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  `

export default QuestionRecipeSearch