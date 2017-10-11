import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import { addNewComment } from '../http-service';
import PostComment from './PostComment';
import { fetchPostComments } from '../actions/index';

const customStyles = {
  content: {
    height: '250px',
    width: '600px',
    margin: '0 auto',
  },
};

class PostComments extends Component {
  state = {
    isOpen: false,
    commentBody: '',
  };

  componentDidMount() {
    this.props.dispatch(fetchPostComments(this.props.postId));
  }

  onChange = (event) => {
    this.setState({ commentBody: event.target.value });
  }

  addComment = () => {
    this.setState({ isOpen: true });
  }

  closeDeletePostModal = (modalResponse) => {
    this.setState({ isOpen: false });
    if (modalResponse) {
      const postCommentData = {
        id: uuidv4(),
        timestamp: new Date(),
        body: this.state.commentBody,
        owner: 'none',
        parentId: this.props.postId,
      };
      addNewComment(postCommentData)
        .then(() => {
          this.props.dispatch(fetchPostComments(this.props.postId));
          this.setState({ commentBody: '' });
        });
    }
  }

  render() {
    return (
      <div>
        <i
          className="material-icons"
          style={{ cursor: 'pointer', color: '#539453' }}
          role="button"
          tabIndex="0"
          onClick={this.addComment}
        >
          add_circle
        </i>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeDeletePostModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Modal"
          style={customStyles}
        >
          <p>Add a new comment: </p>
          <div>
            <textarea
              className="form-control"
              rows="5"
              value={this.state.commentBody}
              onChange={this.onChange}
            />
          </div>
          <div className="row">
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostModal(true)}
              >
                Yes
              </button>
            </div>
            <div className="col-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.closeDeletePostModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
        <div>
          {
            this.props.allPostComments.length === 0 ?
              <p>There is no post comments</p> :
              <div>
                <h4>Post comments: </h4>
                <ul>
                  {this.props.allPostComments.map(item => (
                    <PostComment key={item.id} data={item} />
                  ))}
                </ul>
              </div>
          }
        </div>
      </div>
    );
  }
}

PostComments.defaultProps = {
  postId: '',
};

PostComments.propTypes = {
  postId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  allPostComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  allPostComments: state[state.currentPostId] || [],
});

const connectedPostComments = connect(mapStateToProps)(PostComments);
export default connectedPostComments;
