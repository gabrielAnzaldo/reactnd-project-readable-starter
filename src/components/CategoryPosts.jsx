import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory } from '../actions/index';

import Post from './Post';

class CategoryPosts extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.dispatch(fetchPostsByCategory(category));
  }

  render() {
    return (
      <div>
        <Link to="/">
          <i
            className="material-icons"
            style={{ color: 'green' }}
            role="button"
            tabIndex="-1"
          >
            home
          </i>
        </Link>
        <h4>{this.props.match.params.category} posts: </h4>
        <ul>
          {this.props && this.props.categoryPosts &&
            this.props.categoryPosts.map(item => (
              <Post key={item.id} data={item} showControls />
            ))}
          {this.props && this.props.categoryPosts &&
            this.props.categoryPosts.length === 0 &&
            <p>There is no added posts </p>
          }
        </ul>
      </div>
    );
  }
}

CategoryPosts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categoryPosts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
  })).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  categoryPosts: state.finalPosts || [],
});

const connectedCategoryPosts = connect(mapStateToProps)(CategoryPosts);
export default connectedCategoryPosts;
