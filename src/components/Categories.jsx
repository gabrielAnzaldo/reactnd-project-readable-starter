import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddPost from './AddPost';

const Categories = ({ categories }) => (
  <div>
    <h3>
      Categories
    </h3>
    <AddPost />
    <ul>
      {categories && categories.map(item => (
        <div key={item.name}>
          <li ><Link to={`/${item.path}`}>{item.name}</Link></li>
        </div>
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
