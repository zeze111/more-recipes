import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

/** Stateless component to render details of a recipe card
 *
 * @export {function} AllContent
 *
 * @param {object} recipe
 *
 * @returns {null} null
 */
const RecipeCard = ({
  recipe: {
    id, name, preparationTime, image
  }
}) => {
  const show = `${name.substring(0, 10)}...`;
  return (
    <li >
      <div className="col s2 offset-1">
        <div className="card hoverable grey lighten-4 home-cards">
          <div className="card-image">
            <img
              src={image || '/images/noimg.png'}
              alt="recipe"
              className="responsive-img image-style"
            />
            <div className="card-action">
              <Link
                to={`/recipe/${id}`}
                href={`/recipe/${id}`}
                className="home-text-style"
                data-tip={name}
              > {show}
                <ReactTooltip />
              </Link> {preparationTime}
            </div>
          </div>
        </div>
      </div>
    </li>

  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired
};

export default RecipeCard;
