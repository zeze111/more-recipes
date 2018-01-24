import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getAllRecipes,
  getMostUpvotedRecipe
} from '../../actions/recipeActions';
import Slide from './Slide';
import UpvotedContent from './UpvotedContent';
import AllContent from './AllContent';
import PreLoader from '../common/PreLoader';
import '../../assets/style.scss';
import '../../assets/init';

/**
 *
 *
 * @class Homepage
 * @extends {React.Component}
 */
class Homepage extends Component {
  /**
   * @description Constructor Function
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  /**
   * @memberof Home
   * @return {void}
   */
  componentWillMount() {
    this.props.getAllRecipes()
      .then(() => {
        this.setState({ isLoading: false });
      });
    this.props.getMostUpvotedRecipe()
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  /**
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const allRecipes = (this.props.recipes) ? (this.props.recipes) : [];
    const upvoted = (this.props.upvotedRecipes) ?
      (this.props.upvotedRecipes) : [];
    return (
      <div id="homepageBody">
        <main>
          <Slide />
          <div className="container full-container">
            <br /> <br />
            <h5 className="light black-text lighten-3">
              MOST UPVOTED RECIPES
            </h5>
            <div className="row">
              {
                this.state.isLoading &&
                <div className="center-align loader-style min-preloader">
                  <PreLoader />
                </div>
              }
              {!this.state.isLoading &&
                <ul className="categories flex-container-homepage">
                  {
                    upvoted.map((recipe, index) => (
                      <UpvotedContent
                        recipe={recipe}
                        key={index}
                      />))
                  }
                </ul>
              }
            </div>
          </div>
          <div className="container full-container">
            <br /> <br />
            <Link
              to="/allRecipes"
              href="/allRecipe"
            >
              <h5 className="light text-color"> ALL RECIPES </h5>
            </Link>
            <div className="row remove-margin-bottom">
              {
                this.state.isLoading &&
                <div className="center-align loader-style min-preloader">
                  <PreLoader />
                </div>
              }
              {!this.state.isLoading &&
                <ul className="categories flex-container-homepage">
                  {
                    allRecipes.slice(0, 5).map((recipe, index) => (
                      <AllContent
                        recipe={recipe}
                        key={index}
                      />))
                  }
                </ul>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Homepage.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  getMostUpvotedRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
  upvotedRecipes: PropTypes.arrayOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipeReducer.recipes,
  upvotedRecipes: state.recipeReducer.upvotedRecipes
});

export default connect(mapStateToProps, {
  getAllRecipes,
  getMostUpvotedRecipe
})(Homepage);
