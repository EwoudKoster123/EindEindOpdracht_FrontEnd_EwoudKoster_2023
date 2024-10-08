import {NavLink} from "react-router-dom";
import alle_recepten from "../../assets/alle_recepten.jpg"
import whats_in_the_fridge from "../../assets/whats_in_the_fridge.png"
import all_recepies from "../../assets/world_cuisines.png"
import mostpopular from "../../assets/mostpopular.png"
import lifting_the_mood_with_good_food from "../../assets/lifting_the_mood_with_food.png"
import styles from "./Home.module.css"
import HomeCard from "../../components/homecard/HomeCard";

function Home() {
    return (
        <>
            <main className={styles["homepage-container"]}>
                <section className={styles["section-allrecipes"]}>
                    <NavLink to="/AllRecipes">
                        <HomeCard
                            image={alle_recepten}
                            title={"Alle recepten"}
                            />
                    </NavLink>
                </section>
                <section className={styles["section-popular"]}>
                    <NavLink to="/Popular">
                        <HomeCard
                            image={mostpopular}
                            title={"Popular"}
                        />
                    </NavLink>
                </section>
                <section className={styles["section-cuisine"]}>
                    <NavLink to="/cuisine">
                        <HomeCard
                            image={all_recepies}
                            title={"In welke keuken heeft u zin?"}
                        />
                    </NavLink>
                </section>
                <section className={styles["section-questionrecipe"]}>
                    <NavLink to="/questionrecipe">
                        <HomeCard
                            image={lifting_the_mood_with_good_food}
                            title={"In wat voor een soort recept heeft u zin?"}
                        />
                    </NavLink>
                </section>
                <section className={styles["section-fridgerecipe"]}>
                    <NavLink to="/fridgerecipe">
                        <HomeCard
                            image={whats_in_the_fridge}
                            title={"Recept aan de hand van ingredienten in de koelkast"}
                        />
                    </NavLink>
                </section>

            </main>
        </>
    );
}

export default Home;