import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-materialize';

/** Stateless component to render details of Categories dropdown
 *
 * @export {function} Categories
 *
 * @param {object} props
 *
 * @returns {null} null
 */
const Categories = (props) => {
  const appetizer = 'Appetizer';
  const main = 'Main';
  const dessert = 'Dessert';
  const drinks = 'Drinks';
  const all = 'All Recipes';
  return (
    <Dropdown
      className="content-recipes"
      trigger={
        <div className="div-pointer">
          <h5 className="light top text-headers caps2">
            {props.dropdown}
            <i className="material-icons">arrow_drop_down</i>
          </h5>
        </div>
                }
    >
      <ul>
        <li className="grey-text default-droplist">
          <div>Select Category</div>
        </li>
        <li>
          <button
            id="all-button"
            className="dropdown-btn left-align white waves-effect waves-grey"
            onClick={() => props.onSelectAllRecipes(all)}
          >{all}
          </button>
        </li>
        <li>
          <button
            id="app-button"
            className="dropdown-btn left-align white waves-effect waves-grey"
            onClick={() => props.onSelectCategory(appetizer)}
          >{appetizer}
          </button>
        </li>
        <li>
          <button
            id="main-button"
            className="dropdown-btn left-align white waves-effect waves-grey"
            onClick={() => props.onSelectCategory(main)}
          >{main}
          </button>
        </li>
        <li>
          <button
            id="dess-button"
            className="dropdown-btn left-align white waves-effect waves-grey"
            onClick={() => props.onSelectCategory(dessert)}
          >{dessert}
          </button>
        </li>
        <li>
          <button
            id="drink-button"
            className="dropdown-btn left-align white waves-effect waves-grey"
            onClick={() => props.onSelectCategory(drinks)}
          >{drinks}
          </button>
        </li>
      </ul>
    </Dropdown>
  );
};

Categories.propTypes = {
  onSelectAllRecipes: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  dropdown: PropTypes.string.isRequired
};

export default Categories;
