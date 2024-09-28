import './App.css';
import React, {useContext} from "react";
import {AuthContext} from "./auth context/AuthContext";
import Home from "./pages/home/Home";
import Popular from "./pages/popular/Popular";
import AllRecipes from "./pages/all-recipies/AllRecipes";
import Searched from "./pages/searched/Searched";
import Recipe from "./pages/recipe/Recipe";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import {Route, Switch, Redirect} from "react-router-dom";
import Login from "./pages/login/Loginpage";
import TopMenu from "./components/topmenu/TopMenu";
import QuestionRecipe from "./pages/question-recipe/QuestionRecipe";
import FridgeRecipe from "./pages/fridge-recipe/FridgeRecipe";
import Cuisine from "./pages/cuisine/Cuisine";

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
