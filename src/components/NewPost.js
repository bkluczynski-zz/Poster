import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Checkbox, Form, Container, Divider } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'
import { validate } from '../utils/helpers'


  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


const NewPost = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props

  return (
    <Container>
      <Divider horizontal/>
      <Form onSubmit={ handleSubmit }>
          <Form.Field control={Field} label="Title" placeholder="Title" component={renderField} type="text" name="title"/>
          <Form.Field control={Field} label="Post" placeholder="I want to write about..." component={renderField} type="text" name="body"/>
          <Form.TextArea control={Field} label="Name" placeholder="Name" component={renderField} type="text" name="author"/>
          <Form.Field>
            <label>Category</label>
            <Field name="category" component="select">
              <option defaultValue="react">react</option>
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

export default reduxForm({
  form: 'newPost',
  validate,
})(NewPost)
