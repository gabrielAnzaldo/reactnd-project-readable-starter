import React from 'react';
import PropTypes from 'prop-types';

const PostComment = props => (
  <div>
    comment: {props.data.body}
  </div>
);

PostComment.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostComment;
