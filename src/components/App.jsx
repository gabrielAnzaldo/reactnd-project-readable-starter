import React from 'react';
import { Route } from 'react-router-dom';

import Categories from '../components/Categories/Categories';
import CategoryPosts from '../components/Categories/CategoryPosts';
import AllBlogPost from '../components/Posts/AllBlogPost';
import PostDetail from '../components/Posts/PostDetail';

const Main = () => (
  <div>
    <Route
      exact
      path="/"
      render={() => (
        <div>
          <Categories />
          <AllBlogPost />
        </div>
      )}
    />
    <Route
      exact
      path="/:category"
      component={CategoryPosts}
    />
    <Route
      exact
      path="/:category/:postId"
      component={PostDetail}
    />
  </div>
);

export default Main;
