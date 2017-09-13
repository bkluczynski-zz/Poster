import React from 'react'
import { Field, reduxForm } from 'redux-form'


let EditComment = props => {
  const { handleSubmit } = props


  console.log("props inside", this.props)

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="body">Body</label>
        <Field name="body" component="textarea" type="text" />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Field name="author" component="input" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

EditComment = reduxForm({
  // a unique name for the form
  form: 'editComment'
})(EditComment)

export default EditComment
