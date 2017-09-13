import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {load as loadPost} from '../actions'



let EditPost = props => {

  const { handleSubmit, load, pristine, reset, submitting } = props

  console.log("what's inside post", props.post)


  console.log("props inside", props.load)

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



EditPost = reduxForm({
  form: 'editPost',
})(EditPost)

export default EditPost
