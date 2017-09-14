import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {load as loadPost} from '../actions'
import { Button, Checkbox, Form, Container, Divider } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'


let EditPost = props => {

  const { handleSubmit, load, pristine, reset, submitting } = props

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


EditPost = reduxForm({
  form: 'editPost',
})(EditPost)

export default EditPost
