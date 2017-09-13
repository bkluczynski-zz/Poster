import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import PostList from './PostList';
import Post from './Post';
import Category from './Category'
import NewPostPage from './NewPostPage'
import EditPostPage from './EditPostPage'
import EditPost from './EditPost'
import NewCommentPage from './NewCommentPage'
import EditCommentPage from './EditCommentPage'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom';
import { populatePosts, populateComments, populateCategories } from '../actions'
import NewPost from './NewPost'


class App extends Component {

componentDidMount(){
  this.props.fetchPosts()
  this.props.getCategories()
}

  render() {

    return (
      <div className="app">
        <Switch>
          <Route exact path="/post/create" component={NewPostPage}/>
          <Route exact path="/posts/:id" component={EditPostPage}/>
          <Route exact path="/:category/create/comments/:id" component={NewCommentPage}/>
          <Route exact path="/:category/edit/comments/:id" component={EditCommentPage}/>
          <Route exact path="/:category" component={PostList}/>
          <Route exact path="/" component={PostList}/>
          <Route exact path="/:category/:id" component={Post}/>
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(populatePosts()),
  getCategories: () => dispatch(populateCategories())

})

export default withRouter(connect(null,mapDispatchToProps)(App));
