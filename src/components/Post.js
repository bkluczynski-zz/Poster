import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts, populateComments, getPost, deletePost,upVotePost } from '../actions'
import Category from './Category'
import GiveMeComment from './GiveMeComment'
import { has } from 'lodash';
import { Link, withRouter } from 'react-router-dom'
import sortBy from 'sort-by'
import {load as loadPost} from '../actions'
import NewCommentPage from './NewCommentPage'



class Post extends Component {

  componentDidMount(){
    this.props.fetchPosts()
  }


  render() {
    const { post, comments } = this.props
    const { id } = this.props.match.params
    console.log("these are the props", this.props)
    return (
      <div className="App">
        {post.map(post => (
          <div key={post.id}>
            <p>Title : {post.title}</p>
            <p>Body : {post.body}</p>
            <p>Author : {post.author}</p>
            <p>Number of comments : {comments.filter(com => com.parentId === this.props.match.params.id).length}</p>
            <p>Scoring : {post.voteScore}</p>
              <button onClick={() => this.props.votePost(post.id, "upVote")}>+</button>
              <button onClick={() => this.props.votePost(post.id, "downVote")}>-</button>
              
              <Link to="/" onClick={() => {
                  this.props.deletePost(this.props.match.params.id)
                }}>
                Delete Me
              </Link>
              <Link to={`/posts/${this.props.match.params.id}`}>
                Edit Me
              </Link>
          </div>
        ))}
        <Link to={`/${this.props.match.params.category}/create/comments/${this.props.match.params.id}`}>
          Add Comment
        </Link>
        <GiveMeComment postId={this.props.match.params.id} category={this.props.match.params.category} comments={comments.sort(sortBy('-voteScore'))}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  comments : Object.keys(state.post.comments).map(comId => state.post.comments[comId]),
  post : Object.keys(state.post.posts).map(id => state.post.posts[id]).filter(post => post.id === props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  deletePost:(post) => dispatch(deletePost(post)),
  getComments: (id) => dispatch(populateComments(id)),
  fetchPosts: () => dispatch(populatePosts()),
  votePost:(id,vote) => dispatch(upVotePost(id,vote))
})




export default connect(mapStateToProps, mapDispatchToProps)(Post);
