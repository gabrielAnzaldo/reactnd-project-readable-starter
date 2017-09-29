import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

class AllBlogPost extends Component {
  orderBy = () => {
  };

  render() {
    return (
      <div>
        <hr />
        <div className="container">
          <div className="row justify-content-start">
            <div className="col col-sm-2">
              One by:
            </div>
            <div className="col col-sm-3">
              <button
                type="button"
                className="btn btn-primary"
                style={{ paddingLeft: '20px', paddingRight: '15px' }}
                onClick={() => this.orderBy('voteScore')}
              >
                <div className="row">
                  vote score
                  <i className="material-icons">
                    keyboard_arrow_up
                  </i>
                </div>
              </button>
            </div>
            <div className="col col-sm-3">
              <button
                type="button"
                className="btn btn-primary"
                style={{ paddingLeft: '20px', paddingRight: '15px' }}
                onClick={() => this.orderBy('timestamp')}
              >
                <div className="row">
                  timestamp
                  <i className="material-icons">
                    keyboard_arrow_up
                  </i>
                </div>
              </button>
            </div>
            <div className="col col-sm-4">
              <span />
            </div>
          </div>
        </div>
        <h3>All posts</h3>
        <ul>
          {this.props.posts.map(item => (
            <li key={item.id}>
              {item.title} {`(${item.category})`} {`(${item.voteScore})`}
            </li>
          ))}
        </ul>
      </div >
    );
  }
}

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
