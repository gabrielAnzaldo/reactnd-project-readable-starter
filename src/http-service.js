const api = 'http://localhost:5001';
const defaultParameters = { headers: { Authorization: 'granted' } };

export const getAllCategories = () => fetch(`${api}/categories`,
  defaultParameters)
  .then(response => response.json());

export const getPostsByCategory = category => fetch(`${api}/${category}/posts`,
  defaultParameters)
  .then(response => response.json());

export const getAllPosts = () => fetch(`${api}/posts`,
  defaultParameters)
  .then(response => response.json());

export const addNewPost = postData => fetch(`${api}/posts`,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'granted',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  .then(response => response.json())
  .catch(response => response.json());

export const getPost = postId => fetch(`${api}/posts/${postId}`,
  defaultParameters)
  .then(response => response.json());

export const changeVotePost = (postId, voteParam) => fetch(`${api}/posts/${postId}`,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'granted',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ option: voteParam }),
  })
  .then(response => response.json());

export const deletePost = postId => fetch(`${api}/posts/${postId}`,
  {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: 'granted',
      'Content-Type': 'application/json',
    },
  })
  .then(response => response);

export const addNewComment = commentData => fetch(`${api}/comments`,
  {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'granted',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  })
  .then(response => response.json());

export const getPostComments = postId => fetch(`${api}/posts/${postId}/comments`,
  defaultParameters)
  .then(response => response.json());
