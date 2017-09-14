import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Container, Divider } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'



let NewPost = props => {
  const { handleSubmit } = props

  console.log("props inside", this.props)

  return (
    <Container>
      <Divider horizontal/>
      <Form onSubmit={ handleSubmit }>
          <Form.Field control={Field} label="Title" placeholder="Title" component="input" type="text" name="title"/>
          <Form.Field control={Field} label="Post" placeholder="I want to write about..." component="input" type="text" name="body"/>
          <Form.TextArea control={Field} label="Name" placeholder="Name" component="input" type="text" name="author"/>
          <Form.Field>
            <label>Category</label>
            <Field name="category" component="select">
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udacity">udacity</option>
            </Field>
          </Form.Field>
          <Form.Button>Submit</Form.Button>
          <Form.Button as={Link} to="/">Back</Form.Button>
      </Form>
    </Container>

  )
}

NewPost = reduxForm({
  // a unique name for the form
  form: 'newPost'
})(NewPost)

export default NewPost
