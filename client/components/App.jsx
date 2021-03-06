import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './homepage/Homepage';
import SignupPage from './signup/Signuppage';
import NavigationBar from './navBar/NavigationBar';
import Footer from './Footer';
import AddRecipePage from './addRecipe/AddRecipePage';
import UpdateRecipePage from './updateRecipe/UpdateRecipePage';
import RecipeDetails from './recipe/RecipeDetails';
import Profile from './user/Profile';
import AllRecipes from './allRecipes/AllRecipes';
import confirmAuth from './confirmAuth';
import PageNotFound from './PageNotFound';

/**
 * @const App
 *
 * @returns {any} routes
 */
const App = () => (
  <Router>
    <div id="wrap">
      <NavigationBar />
      <Switch>
        <Route
          path="/"
          exact
          component={Homepage}
        />
        <Route
          path="/signup"
          component={SignupPage}
        />
        <Route
          path="/add-recipe"
          component={confirmAuth(AddRecipePage)}
        />
        <Route
          path="/user/:tab"
          component={confirmAuth(Profile)}
        />
        <Route
          path="/update-recipe/:recipeId"
          component={confirmAuth(UpdateRecipePage)}
        />
        <Route
          path="/user-recipes/:recipeId"
          component={confirmAuth(RecipeDetails)}
        />
        <Route
          path="/recipe/:recipeId"
          component={RecipeDetails}
        />
        <Route
          path="/all-recipes"
          component={AllRecipes}
        />
        <Route
          path="*"
          component={PageNotFound}
        />
      </Switch>
      <Footer />
    </div>
  </Router>
);
export default App;
