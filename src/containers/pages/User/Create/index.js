import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { graphql } from 'react-apollo'
import { toast } from 'react-toastify'
import { UserForm } from 'components'
import { queryListUser } from 'graphql/queries'
import { mutationCreateUser } from 'graphql/mutations'

export class UserCreatePage extends Component {
  handleSubmit = async values => {
    try {
      await this.props.createUser({
        variables: { user: values },
        refetchQueries: [{ query: queryListUser }],
      })
      this.props.history.push('/')
    } catch (error) {
      toast.error('Email or Username is already taken')
    }
  }

  render() {
    const colProps = { lg: 12, className: 'mt-5' }

    return (
      <Container>
        <Row>
          <Col {...colProps}>
            <div className="d-flex align-items-center justify-content-between">
              <h1>Create New User</h1>
              <Link to="/">
                <Button color="primary">Back</Button>
              </Link>
            </div>
          </Col>
          <Col {...colProps}>
            <UserForm onSubmit={this.handleSubmit} />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default graphql(mutationCreateUser, { name: 'createUser' })(UserCreatePage)
