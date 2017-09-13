import React from 'react'
import EditPost from './EditPost'
import { addPost, editPost } from '../actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


class EditPostPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    this.props.editPost(this.props.match.params.id,values)
    this.props.history.push('/')
  }

  render() {

    console.log("edit post props", this.props)

    return (
      <EditPost onSubmit={this.submit} post={this.props.post} initialValues={this.props.post[0]}/>
    )
  }
}

const mapStateToProps = (state,props) => ({
  post : Object.keys(state.post.posts).map(id => state.post.posts[id]).filter(post => post.id === props.match.params.id)
})


const mapDispatchToProps = (dispatch) => ({
  editPost: (id, post) => dispatch(editPost(id,post))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
