import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';

import { addNewPost } from '../../../service/api/http-service';
import { fetchAllPosts } from '../../../actions';
import defaultPostStyles from '../AddPostStyles';

class AddPost extends Component {
  state = {
    modalIsOpen: false,
    id: uuidv4(),
    timestamp: Date.now(),
    title: '',
    body: '',
    author: '',
    category: 'react',
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  clearNewPostState = () => (
    this.setState({
      id: uuidv4(),
      timestamp: Date.now(),
      title: '',
      body: '',
      author: '',
      category: 'react',
      voteScore: 1,
      deleted: false,
    })
  );

  handleSubmit = (event) => {
    event.preventDefault();
    this.closeModal();
    const newPost = Object.assign({}, this.state);
    delete newPost.modalIsOpen;
    addNewPost(newPost)
      .then(() => {
        this.clearNewPostState();
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
          onClick={this.openModal}
          style={{ cursor: 'pointer', marginTop: '10px', color: '#539453' }}
          role="button"
          tabIndex="0"
        >
          add_circle
        </i>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Example Modal"
          style={defaultPostStyles()}
        >
          <i
            onClick={this.closeModal}
            role="button"
            tabIndex="-1"
            className="material-icons"
            style={{ cursor: 'pointer', marginLeft: '97%', marginBottom: '10px', color: 'red' }}
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
                  Vote score: <b>1</b>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '86%' }}>
              Add post
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

AddPost.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const conectedComponent = connect()(AddPost);
export default conectedComponent;
