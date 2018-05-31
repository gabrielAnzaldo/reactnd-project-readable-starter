import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Post from './Post';

const mapStateToProps = (state, ownProps) => {
  let tempNumberOfComments = 0;
  if (state && state[ownProps.data.id]) {
    tempNumberOfComments = state[ownProps.data.id].length;
  }
  return {
    numberOfComments: tempNumberOfComments,
  };
};

const PostWithLocation = withRouter(Post);
const connectedPostComponent = connect(mapStateToProps)(PostWithLocation);
export default connectedPostComponent;
