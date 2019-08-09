import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'
import { graphql, compose } from 'react-apollo'
import { get, omit } from 'lodash'
import moment from 'moment'
import { toast } from 'react-toastify'
import { UserForm, Loader } from 'components'
import { queryListUser, queryGetUser } from 'graphql/queries'
import { mutationUpdateUser } from 'graphql/mutations'

export class UserEditPage extends Component {
  get user() {
    const { data } = this.props
    return get(data, 'user[0]')
  }

  get loading() {
    const { data } = this.props

    return data.loading
  }

  handleSubmit = async values => {
    try {
      await this.props.updateUser({
        variables: {
          user: {
            ...omit(values, '__typename', 'createdAt'),
            birthday: moment(values.birthday),
          },
        },
        refetchQueries: [{ query: queryListUser }],
      })
      this.props.history.push('/')
    } catch (error) {
      toast.error('Email or Username is already taken')
    }
  }

  renderContent() {
    if (this.loading) {
      return <Loader />
    }

    if (!this.user) {
      return <h5>User Not Found</h5>
    }

    return <UserForm initialValues={{ ...this.user, birthday: +this.user.birthday }} onSubmit={this.handleSubmit} />
  }

  render() {
    const colProps = { lg: 12, className: 'mt-5' }

    return (
      <Container>
        <Row>
          <Col {...colProps}>
            <div className="d-flex align-items-center justify-content-between">
              <h1>Update User {this.user && `(${this.user.name})`}</h1>
              <Link to="/">
                <Button color="primary">Back</Button>
              </Link>
            </div>
          </Col>
          <Col {...colProps}>{this.renderContent()}</Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  graphql(queryGetUser, {
    options: ({ match }) => ({
      variables: { id: +match.params.userId },
    }),
  }),
  graphql(mutationUpdateUser, { name: 'updateUser' }),
)(UserEditPage)
