import React from 'react'
import { Field, reduxForm } from 'redux-form'


let NewPost = props => {
  const { handleSubmit } = props


  console.log("props inside", this.props)

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <Field name="body" component="textarea" type="text" />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Field name="author" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="category">Category</label>
          <div>
            <Field name="category" component="select">
              <option />
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udacity">udacity</option>
            </Field>
          </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

NewPost = reduxForm({
  // a unique name for the form
  form: 'newPost'
})(NewPost)

export default NewPost
