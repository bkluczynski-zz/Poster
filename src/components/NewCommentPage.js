import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { addComment } from '../actions'
import NewComment from './NewComment'


class NewCommentPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    const comment = values
    comment.parentId = this.props.match.params.id
    this.props.addComment(comment)
    this.props.history.push(`/${this.props.match.params.category}/${this.props.match.params.id}`)

  }

  render() {
    return (
      <NewComment onSubmit={this.submit}
        />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (post) => dispatch(addComment(post))
})


export default connect(null, mapDispatchToProps)(NewCommentPage);
