import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Search.module.css";

function Search() {
    const [input, setInput] = useState("");
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        history.push('/searched/' + input);
    };

    return (
        <form onSubmit={submitHandler} className={styles["form-style"]}>
            <div className={styles["div-search"]}>
                <input
                    className={styles["input-search"]}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                    placeholder="Search for recipes..."
                />
            </div>
        </form>
    );
}

export default Search;
