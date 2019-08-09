import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form, Button } from 'reactstrap'
import { capitalize } from 'lodash'
import { Input, DatePicker } from 'components'
import { COLORS } from 'globalConstants'
import validate from './validate'

const UserForm = ({ loading, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={12}>
        <Field name="name" label="Name" component={Input} />
      </Col>
      <Col md={12} className="mt-4">
        <Field name="username" label="Username" component={Input} />
      </Col>
      <Col md={12} className="mt-4">
        <Field name="email" label="Email" component={Input} />
      </Col>
      <Col md={12} className="mt-4">
        <Field name="birthday" label="Birthday" component={DatePicker} />
      </Col>
      <Col md={12} className="mt-4">
        <Field name="favoriteColor" label="Favorite Color" type="select" component={Input}>
          <option>--- Select ---</option>
          {COLORS.map(color => (
            <option key={color} value={color}>
              {capitalize(color)}
            </option>
          ))}
        </Field>
      </Col>
      <Col md={12} className="mt-4 text-right">
        <Button color="primary" disabled={loading}>
          Save
        </Button>
      </Col>
    </Row>
  </Form>
)

export default reduxForm({
  form: 'UserForm',
  enableReinitialize: true,
  validate,
})(UserForm)
