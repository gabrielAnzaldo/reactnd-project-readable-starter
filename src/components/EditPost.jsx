import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { editPost } from '../http-service';
import { fetchAllPosts } from '../actions';

const customStyles = {
  content: {
    height: '400px',
    width: '650px',
    margin: '0 auto',
  },
};

class EditPost extends Component {
  state = {
    showEditPostDialog: false,
    id: -1,
    title: '',
    body: '',
    author: '',
    category: '',
    voteScore: 0,
  };

  componentDidMount = () => {
    this.setState({
      id: this.props.postData.id,
      author: this.props.postData.author,
      title: this.props.postData.title,
      body: this.props.postData.body,
      category: this.props.postData.category,
      voteScore: this.props.postData.voteScore,
    });
  }

  editPost = () => {
    this.setState({ showEditPostDialog: true });
  }

  closeModal = () => {
    this.setState({ showEditPostDialog: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showEditPostDialog: false });
    const newPostData = Object.assign({}, this.state, { timestamp: new Date() });
    delete newPostData.showEditPostDialog;
    editPost(newPostData)
      .then(() => {
        this.props.dispatch(fetchAllPosts());
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <i
          className="material-icons"
          style={{ float: 'right', color: 'rgb(20, 86, 156)', cursor: 'pointer' }}
          onClick={this.editPost}
          role="button"
          tabIndex="-1"
        >
          edit
        </i>
        <Modal
          isOpen={this.state.showEditPostDialog}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <i
            onClick={this.closeModal}
            role="button"
            tabIndex="-1"
            className="material-icons"
            style={{ cursor: 'pointer', marginLeft: '97%', marginBottom: '10px' }}
          >
            close
          </i>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <div className="col">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  onChange={this.handleChange}
                  value={this.state.title}
                  autoFocus
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  placeholder="Author"
                  onChange={this.handleChange}
                  value={this.state.author}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="body"
                  name="body"
                  onChange={this.handleChange}
                  value={this.state.body}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <select
                  value={this.state.category}
                  className="custom-select"
                  name="category"
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                >
                  <option defaultValue value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
                </select>
              </div>
              <div className="col" style={{ textAlign: 'center', marginTop: '10px' }}>
                <label htmlFor="voteScore" >
                  Vote score: <b>{this.state.voteScore}</b>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '86%' }}>
              Edit post
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

EditPost.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const connectedEditPost = connect()(EditPost);
export default connectedEditPost;
