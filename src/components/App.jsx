import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import uuidv4 from 'uuid/v4';

import Categories from './Categories';
import CategoryPosts from './CategoryPosts';
import AllBlogPost from './AllBlogPost';
// import * as BlogAPI from '../http-service';

class Main extends Component {
  componentDidMount() {
    // post example
    // const temPost = {
    //   id: uuidv4(),
    //   timestamp: Date.now(),
    //   title: 'gabriel y deysi',
    //   body: 'an awesome body',
    //   owner: 'gabriel y deysi',
    //   category: 'redux',
    // };
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
