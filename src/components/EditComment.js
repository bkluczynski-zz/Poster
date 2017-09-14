import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Container, Divider } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

let EditComment = props => {
  const { handleSubmit } = props


  console.log("props inside", this.props)

  return (
    <Container>
      <Divider horizontal/>
      <Form onSubmit={ handleSubmit }>
          <Form.Field control={Field} label="Comment" placeholder="I want to write about..." component="input" type="text" name="body"/>
          <Form.TextArea control={Field} label="Name" placeholder="Name" component="input" type="text" name="author"/>
          <Form.Button>Submit</Form.Button>
          <Form.Button as={Link} to="/">Back</Form.Button>
      </Form>
    </Container>
  )
}

EditComment = reduxForm({
  // a unique name for the form
  form: 'editComment'
})(EditComment)

export default EditComment
