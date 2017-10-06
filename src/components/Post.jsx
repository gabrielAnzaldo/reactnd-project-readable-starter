import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeVotePost } from '../http-service';
import { fetchAllPosts } from '../actions';

class Post extends Component {
  changeVote = (voteType) => {
    changeVotePost(this.props.data.id, voteType)
      .then(() => {
        this.props.dispatch(fetchAllPosts());
      });
  };

  render() {
    return (
      <div
        className="card"
        style={{ width: '60%', margin: '0 auto', marginBottom: '15px', marginTop: '15px' }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <h4 className="card-title">{this.props.data.title}</h4>
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
            Author: {this.props.data.author}
          </h6>
          <p className="card-text">
            {this.props.data.body}
          </p>
          <h5><b>score:</b> {this.props.data.voteScore}</h5>
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-info"
                style={{ marginRight: '15px' }}
                onClick={() => this.changeVote('upVote')}
              >
                Upvote
              </button>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => this.changeVote('downVote')}
              >
                Downvote
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Post.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const connectedPostComponent = connect()(Post);
export default connectedPostComponent;
