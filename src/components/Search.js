import styled from 'styled-components';
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import styles from "../styles/Search.module.css"

function Search() {

    const [input, setInput] = useState("");
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        history.push('/searched/' + input);
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div className={styles["div-Search"]}>

                <input className={styles["input-search"]} onChange={(e) => setInput(e.target.value)} type="text" value={input} />
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  `

export default Search