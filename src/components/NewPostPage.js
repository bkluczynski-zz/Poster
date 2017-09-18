import React from 'react'
import NewPost from './NewPost'
import { addPost, editPost } from '../actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class NewPostPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    this.props.addPost(values)
    this.props.history.push('/');
  }

  render() {

    console.log("props", this.props.form)

    return (
      <NewPost onSubmit={this.submit}/>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPost(post)),
})


export default connect(null, mapDispatchToProps)(NewPostPage);
