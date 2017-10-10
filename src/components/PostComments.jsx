import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import { addNewComment, getPostComments } from '../http-service';
import PostComment from './PostComment';

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
    availableComments: [],
    commentBody: '',
  };

  componentDidMount() {
    getPostComments(this.props.postId)
      .then((response) => {
        this.setState({ availableComments: response });
      });
  }

  onChange = () => {
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
      addNewComment(postCommentData);
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
            this.state.availableComments.length === 0 ?
              <p>There is no post comments</p> :
              <ul>
                {this.state.availableComments.map(item => (
                  <PostComment key={item.id} data={item} />
                ))}
              </ul>
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
};

export default PostComments;
