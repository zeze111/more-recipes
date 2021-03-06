import React from 'react';

/**
 *
 *
 * @returns {function} App
 * @extends {React.Component}
 */
const Footer = () => (
  <footer className="page-footer nav-color">
    <div className="container">
      <div className="row remove-margin-bottom">
        <div className="footer-center">
          <i className="material-icons col s3 l1 right-align"> local_dining </i>
          <p className="col s6 l3
          left-align footer-style2
          footer-style no-top"
          > MoreRecipes
          </p>
        </div>
      </div>
    </div>
    <div className="footer-copyright footer-style2">
      <div className="container">
        <div className="row remove-margin-bottom">
          <p className="col s3 m1 l1 push-s1 footer-style2"> Made by </p>
          <p className="col s6 m3 l3
          teal-text text-lighten-3 left-align"
          >Osaze Edo-Osagie
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
