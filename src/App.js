import './App.css';
import React, {useContext} from "react";
import {AuthContext} from "./auth context/AuthContext";
import Home from "./home/Home";
import Popular from "./popular/Popular";
import AllRecipes from "./all-recipies/AllRecipes";
import Searched from "./searched/Searched";
import Recipe from "./recipe/Recipe";
import Profile from "./profile/Profile";
import Signup from "./signup/Signup";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./login/Loginpage";
import TopMenu from "./topmenu/TopMenu";
import QuestionRecipe from "./question-recipe/QuestionRecipe";
import FridgeRecipe from "./fridge-recipe/FridgeRecipe";
import Cuisine from "./cuisine/Cuisine";

function App() {

    const { isAuth } = useContext(AuthContext);

  return (
      <>
          <TopMenu />
          <Switch>
              <Route exact path="/"> <Home /></Route>
              <Route path="/Popular"> <Popular/></Route>
              <Route path="/AllRecipes"> <AllRecipes/></Route>
              <Route path="/searched/:search"> <Searched/></Route>
              <Route path="/recipe/:name"><Recipe/></Route>
              <Route path="/login"> <Login/></Route>
              <Route path="/cuisine"> <Cuisine/></Route>
              <Route path="/signup" ><Signup/> </Route>
              <Route path="/questionrecipe" ><QuestionRecipe/> </Route>
              <Route path="/fridgerecipe" ><FridgeRecipe/> </Route>
              <Route path="/profile"> {isAuth ? <Profile /> : <Redirect to="/" />} </Route>
          </Switch>
</>
  );
}

export default App;
