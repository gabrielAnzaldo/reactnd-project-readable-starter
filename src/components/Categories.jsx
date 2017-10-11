import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddPost from './AddPost';

const Categories = ({ categories }) => (
  <div>
    <div className="row">
      <div className="col">
        <h3>
          Categories
        </h3>
      </div>
      <div className="col">
        <AddPost />
      </div>
    </div>
    <ul>
      {categories && categories.map(item => (
        <li key={item.name}><Link to={`/${item.path}`}>{item.name}</Link></li>
      ))}
    </ul>
  </div>
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
