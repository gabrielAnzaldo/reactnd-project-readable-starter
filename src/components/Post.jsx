import React from 'react';
import PropTypes from 'prop-types';

const Post = props => (
  <div
    className="card"
    style={{ width: '60%', margin: '0 auto', marginBottom: '15px', marginTop: '15px' }}
  >
    <div className="card-body">
      <h4 className="card-title">{props.data.title}</h4>
      <h6 className="card-subtitle mb-2 text-muted">
        Author: {props.data.author}
      </h6>
      <p className="card-text">
        {props.data.body}
      </p>
      <h5><b>score:</b> {props.data.voteScore}</h5>
    </div>
  </div >
);

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
