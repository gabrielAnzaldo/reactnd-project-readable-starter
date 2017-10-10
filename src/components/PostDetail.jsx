import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../components/Post';
import PostComments from '../components/PostComments';
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
        <Post data={this.state.data} />
        <PostComments postId={postId} />
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
