import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Categories from './Categories';
import CategoryPosts from './CategoryPosts';
import AllBlogPost from './AllBlogPost';

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
          path="/redux"
          render={() => (
            <CategoryPosts category="redux" />
          )}
        />
        <Route
          path="/react"
          render={() => (
            <CategoryPosts category="react" />
          )}
        />
        <Route
          path="/udacity"
          render={() => (
            <CategoryPosts category="udacity" />
          )}
        />
      </div>
    );
  }
}

export default Main;
