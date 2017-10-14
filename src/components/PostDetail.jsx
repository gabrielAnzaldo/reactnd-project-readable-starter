import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Post from '../components/Post';
import PostCommentsList from '../components/PostCommentsList';
import { getPost } from '../http-service';

class PostDetail extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { postId } = this.props.match.params;
    getPost(postId)
      .then((response) => {
        this.setState({ data: response });
      });
  }

  render() {
    const { postId } = this.props.match.params;

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
        <Post data={this.state.data} postId={postId} showControls={false} />
        <PostCommentsList postId={postId} />
      </div>
    );
  }
}

PostDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostDetail;
