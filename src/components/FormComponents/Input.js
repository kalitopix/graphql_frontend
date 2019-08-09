import React from 'react'
import PropTypes from 'prop-types'
import { Input as BootstrapInput, FormFeedback, Row, Col, Label } from 'reactstrap'

export const Input = ({ input, label, labelSize, placeholder, type, meta: { touched, error }, children, ...props }) => {
  const inputProps = Object.assign(
    { ...input, ...props, placeholder, type },
    touched && error && { invalid: true },
    touched && !error && { valid: true },
  )

  return (
    <Row>
      {label && (
        <Label for={input.name} sm={labelSize}>
          {label}:
        </Label>
      )}
      <Col sm={12 - labelSize}>
        {type === 'select' ? (
          <BootstrapInput {...inputProps}>{children}</BootstrapInput>
        ) : (
          <BootstrapInput {...inputProps} />
        )}
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </Col>
    </Row>
  )
}

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  labelSize: PropTypes.number,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

Input.defaultProps = {
  labelSize: 3,
}

export default Input
