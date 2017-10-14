import * as BlogAPI from '../http-service';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY';
export const GET_ALL_POST_COMMENTS = 'GET_ALL_POST_COMMENTS';
export const GET_CURRENT_POST = 'GET_CURRENT_POST';

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories,
});

export const getAllPosts = posts => ({
  type: GET_ALL_POSTS,
  posts,
});

export const getPostsByCategory = data => ({
  type: GET_POSTS_BY_CATEGORY,
  categoryPosts: data.categoryPosts,
  name: data.name,
});

export const getPostComments = (postId, postComments) => ({
  type: GET_ALL_POST_COMMENTS,
  postId,
  postComments,
});

export const getCurrentPost = currentPostData => ({
  type: GET_CURRENT_POST,
  currentPostData,
});

export const fetchCategories = () => dispatch => (
  BlogAPI
    .getAllCategories()
    .then(data => dispatch(getCategories(data)))
);

export const fetchAllPosts = () => dispatch => (
  BlogAPI
    .getAllPosts()
    .then(data => dispatch(getAllPosts({ posts: data })))
);

export const fetchPostsByCategory = category => dispatch => (
  BlogAPI
    .getPostsByCategory(category)
    .then((data) => {
      const response = {
        categoryPosts: data,
        name: category,
      };
      return dispatch(getPostsByCategory(response));
    })
);

export const fetchPostComments = postId => dispatch => (
  BlogAPI
    .getPostComments(postId)
    .then(response => dispatch(getPostComments(postId, response)))
);

export const fetchCurrentPost = postId => dispatch => (
  BlogAPI
    .getPost(postId)
    .then(response => dispatch(getCurrentPost(response)))
);
