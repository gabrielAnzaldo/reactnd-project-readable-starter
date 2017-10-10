import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Categories from './Categories';
import CategoryPosts from './CategoryPosts';
import AllBlogPost from './AllBlogPost';
import PostDetail from '../components/PostDetail';

class Main extends Component {
  componentDidMount() {
  }

  render() {
    return (
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
  }
}

export default Main;
