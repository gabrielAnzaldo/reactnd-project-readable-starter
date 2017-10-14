import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { deletePostComment, editPostComment, changeVoteCommentScore } from '../http-service';
import { fetchPostComments } from '../actions/index';

const customStyles = {
  content: {
    height: '285px',
    width: '600px',
    margin: '0 auto',
  },
};

const editStyles = {
  content: {
    height: '125px',
    width: '600px',
    margin: '0 auto',
  },
};

class PostComment extends Component {
  state = {
    deletePostCommentIsOpen: false,
    editPostCommentIsOpen: false,
    tempPostComment: '',
    tempPostCommentAuthor: '',
  };

  deletePost = () => {
    this.setState({ deletePostCommentIsOpen: true });
  }

  closeDeletePostCommentModal = (commentState) => {
    this.setState({ deletePostCommentIsOpen: false });
    if (commentState) {
      deletePostComment(this.props.data.id)
        .then(() => {
          this.props.dispatch(fetchPostComments(this.props.data.parentId));
        });
    }
  }

  editPost = () => {
    this.setState({
      editPostCommentIsOpen: true,
      tempPostComment: this.props.data.body,
      tempPostCommentAuthor: this.props.data.author,
    });
  }

  closeEditPostCommentModal = (editCommentState) => {
    this.setState({ editPostCommentIsOpen: false });
    if (editCommentState) {
      const newComment = {
        id: this.props.data.id,
        body: this.state.tempPostComment,
        author: this.state.tempPostCommentAuthor,
        timestamp: new Date(),
      };
      editPostComment(newComment)
        .then(() => {
          this.props.dispatch(fetchPostComments(this.props.data.parentId));
        });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  votePostComment = (voteType) => {
    changeVoteCommentScore(this.props.data.id, voteType)
      .then(() => {
        this.props.dispatch(fetchPostComments(this.props.data.parentId));
      });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.editPostCommentIsOpen}
          onRequestClose={this.closeEditPostCommentModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Modal"
          style={customStyles}
        >
          <div className="form-group">
            <label htmlFor="commentAuthor">Author</label>
            <input
              className="form-control"
              id="commentAuthor"
              placeholder="Comment author"
              name="tempPostCommentAuthor"
              value={this.state.tempPostCommentAuthor}
              onChange={this.handleChange}
            />
          </div>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            placeholder="body"
            name="tempPostComment"
            onChange={this.handleChange}
            value={this.state.tempPostComment}
          />
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeEditPostCommentModal(true)}
              >
                Edit
              </button>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeEditPostCommentModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.deletePostCommentIsOpen}
          onRequestClose={this.closeDeletePostCommentModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Modal"
          style={editStyles}
        >
          <p>Are you sure you want to delete this comment?</p>
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostCommentModal(true)}
              >
                Yes
              </button>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostCommentModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-4">
            Author: {this.props.data.author}<br />
            {this.props.data.body}<br />
            Vote score: {this.props.data.voteScore}
          </div>
          <div className="col-2">
            <i
              className="material-icons"
              style={{ float: 'right', color: '#e25151', cursor: 'pointer' }}
              onClick={this.deletePost}
              role="button"
              tabIndex="-1"
            >
              delete
            </i>
            <i
              className="material-icons"
              style={{ float: 'right', color: 'rgb(20, 86, 156)', cursor: 'pointer' }}
              onClick={this.editPost}
              role="button"
              tabIndex="-1"
            >
              edit
            </i>
            <i
              className="material-icons"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => this.votePostComment('downVote')}
              role="button"
              tabIndex="-1"
            >
              thumb_down
            </i>
            <i
              className="material-icons"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => this.votePostComment('upVote')}
              role="button"
              tabIndex="-1"
            >
              thumb_up
            </i>
          </div>
        </div>
        <hr style={{ marginRight: '25%' }} />
      </div>
    );
  }
}

PostComment.propTypes = {
  data: PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const connectedPostComment = connect()(PostComment);
export default connectedPostComment;
