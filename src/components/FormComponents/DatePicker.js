import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDatePicker from 'react-datepicker'
import { Row, Col, Label, FormFeedback } from 'reactstrap'

class DatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    label: PropTypes.string,
    labelSize: PropTypes.number,
  }

  static defaultProps = {
    labelSize: 3,
  }

  render() {
    const {
      input,
      label,
      labelSize,
      meta: { touched, error },
    } = this.props

    const pickerProps = Object.assign(
      { selected: input.value, onChange: input.onChange },
      touched && error && { className: 'form-control is-invalid' },
      touched && !error && { className: 'form-control is-valid' },
    )

    return (
      <Row>
        {label && (
          <Label for={input.name} sm={labelSize}>
            {label}:
          </Label>
        )}
        <Col sm={12 - labelSize}>
          <ReactDatePicker {...pickerProps} />
          {touched && error && <FormFeedback className="d-block">{error}</FormFeedback>}
        </Col>
      </Row>
    )
  }
}

export default DatePicker
