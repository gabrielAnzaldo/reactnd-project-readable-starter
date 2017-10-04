import React from 'react';
import PropTypes from 'prop-types';

const Post = props => (
  <div
    className="card"
    style={{ width: '60%', margin: '0 auto', marginBottom: '15px', marginTop: '15px' }}
  >
    <div className="card-body">
      <div className="row">
        <div className="col-10">
          <h4 className="card-title">{props.data.title}</h4>
        </div>
        <div className="col-2">
          <i className="material-icons" style={{ float: 'right', color: '#e25151' }}>
            close
          </i>
          <i className="material-icons" style={{ float: 'right', color: 'rgb(20, 86, 156)' }}>
            edit
          </i>
        </div>
      </div>
      <h6 className="card-subtitle mb-2 text-muted">
        Author: {props.data.author}
      </h6>
      <p className="card-text">
        {props.data.body}
      </p>
      <h5><b>score:</b> {props.data.voteScore}</h5>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-info" style={{ marginRight: '15px' }}>
            Upvote
          </button>
          <button type="button" className="btn btn-info">
            Downvote
          </button>
        </div>
      </div>
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
