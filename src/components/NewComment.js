import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Container, Divider } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'


function validate(values){
  const errors = {}
  if (!values.body) {
    errors.body = 'Body is required'
  }
  if (!values.author) {
    errors.author = 'Author is required'
  }

  return errors
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
<div>
  <label>{label}</label>
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>
)

const NewComment = props => {

  const { handleSubmit, pristine, reset, submitting } = props

  console.log("props inside", this.props)

  return (
    <Container>
      <Divider horizontal/>
      <Form onSubmit={ handleSubmit }>
          <Form.Field control={Field} label="Comment" placeholder="I want to write about..." component={renderField} type="text" name="body"/>
          <Form.TextArea control={Field} label="Name" placeholder="Name" component={renderField} type="text" name="author"/>
          <Form.Button>Submit</Form.Button>
          <Form.Button as={Link} to="/">Back</Form.Button>
      </Form>
    </Container>
  )
}

export default reduxForm({
  form: 'newPost',
  validate,
})(NewComment)
