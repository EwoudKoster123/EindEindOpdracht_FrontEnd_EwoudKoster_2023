import {Link} from "react-router-dom";
import styles from "./TopMenu.module.css"

function TopMenu() {
    return (
        <nav>
            <div className="nav-container">
                <ul className={styles["topmenu"]}>
                    <li className={styles["links"]}>
                        <Link to="/" exact activeClassName="active-link">Home</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/AllRecipes" exact activeClassName="active-link">Alle recepten</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/Popular" exact activeClassName="active-link">Populair</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/cuisine" exact activeClassName="active-link">Verschillende keukens</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/questionrecipe" exact activeClassName="active-link">Recept mood</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/fridgerecipe" exact activeClassName="active-link">In de koelkast</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/signup" exact activeClassName="active-link">Signup</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/login" exact activeClassName="active-link">Login</Link>
                    </li>

                    <li className={styles["links"]}>
                        <Link to="/Profile" exact activeClassName="active-link">Profiel</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default TopMenu;