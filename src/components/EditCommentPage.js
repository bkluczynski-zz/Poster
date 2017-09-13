import React from 'react'
import EditPost from './EditPost'
import { editComment } from '../actions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import EditComment from './EditComment'


class EditCommentPage extends React.Component {
  submit = (values) => {
    // print the form values to the console
    this.props.editComment(this.props.match.params.id, values)
    this.props.history.push(`/${this.props.match.params.category}/${this.props.comment[0].parentId}`)
  }

  render() {

    console.log("props in editpage,", this.props)
    return (
      <EditComment onSubmit={this.submit} initialValues={this.props.comment[0]}/>
    )
  }
}

const mapStateToProps = (state,props) => ({
  comment : Object.keys(state.post.comments).map(id => state.post.comments[id]).filter(comment => comment.id === props.match.params.id),
})


const mapDispatchToProps = (dispatch) => ({
  editComment: (id, post) => dispatch(editComment(id,post))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditCommentPage);
