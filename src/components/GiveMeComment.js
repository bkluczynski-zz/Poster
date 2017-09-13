import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts, populateComments, sortComments, deleteComment, voteComment } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import sortBy from 'sort-by'


class GiveMeComment extends Component {


  render()
  {
    const {comments} = this.props
        console.log("comments", this.props)
      return (
        <div className="App">
          {comments.length >= 1 && (
            <div>
              {console.log("im here")}
              <select onChange= {(event) => {this.props.sortComments(comments, event.target.value)}}>
                  <option value="timestamp">Order by timestamp</option>
                  <option value="-voteScore">Order by voteScore</option>
              </select>
            {this.props.comments.filter(comment => comment.parentId === this.props.postId).map(comment => (
            <li key={comment.id}>
              <p>Author : {comment.author}</p>
              <p>Body : {comment.body}</p>
              <p>The voteScore is : {comment.voteScore}</p>
              <button onClick={() => this.props.voteComment(comment.id, "upVote")}>+</button>
              <button onClick={() => this.props.voteComment(comment.id, "downVote")}>-</button>
            <Link to={`/${this.props.category}/edit/comments/${comment.id}`}>
              Edit
            </Link>
            <Link to={`${this.props.postId}`} onClick={() => this.props.deleteComment(comment.id)}>
              Delete
            </Link>
              </li>
          ))}
        </div>
      )}
    </div>
  )}}

const mapStateToProps = (state,props) => ({
  comments : Object.keys(state.post.comments).map(id => state.post.comments[id])
})

const mapDispatchToProps = (dispatch) => ({
  sortComments:(comments, sorter) => dispatch(sortComments(comments,sorter)),
  deleteComment:(id) => dispatch(deleteComment(id)),
  voteComment:(id,vote) => dispatch(voteComment(id,vote))

})


export default connect(mapStateToProps, mapDispatchToProps)(GiveMeComment);
