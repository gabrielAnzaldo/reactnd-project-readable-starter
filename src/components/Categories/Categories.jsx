import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddPost from '../Posts/AddPost';

const Categories = ({ categories }) => (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <a className="navbar-brand"><strong>Categories</strong></a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        {categories && categories.map(item => (
          <li className="nav-item" key={item.name}>
            <Link className="nav-link" to={`/${item.path}`}>
              <span>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <AddPost />
    </div>
  </nav>
);

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories || [],
});

const ConnectedCategories = connect(
  mapStateToProps,
)(Categories);

export default ConnectedCategories;
