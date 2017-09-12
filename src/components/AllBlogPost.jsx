import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AllBlogPost = ({ posts }) => (
  <div>
    <hr />
    <ul>
      {posts.map(item => (
        <li key={item.id}>
          {item.title} Category {`(${item.category})`}
        </li>
      ))}
    </ul>
  </div >
);

AllBlogPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts || [],
});

const connectedAllBlogPost = connect(mapStateToProps)(AllBlogPost);
export default connectedAllBlogPost;
