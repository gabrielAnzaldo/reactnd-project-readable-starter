import React, { Component } from 'react';
import Modal from 'react-modal';

class AddPost extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <i
          className="material-icons"
          onClick={this.openModal}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex="0"
        >
          add_circle
        </i>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
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
          <form>
            <div className="form-group row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Title" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Author" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="body" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <select className="custom-select" style={{ width: '100%' }}>
                  <option defaultValue>React</option>
                  <option value="1">Redux</option>
                  <option value="2">Udacity</option>
                </select>
              </div>
              <div className="col" style={{ textAlign: 'center', marginTop: '10px' }}>
                <label htmlFor="voteScore" >
                  Vote score: <b>1</b>
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '88%' }}>
              Add post
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AddPost;
