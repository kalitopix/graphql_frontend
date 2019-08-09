import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { get } from 'lodash'
import { graphql, compose } from 'react-apollo'
import { Loader } from 'components'
import { queryListUser } from 'graphql/queries'
import { mutationDeleteUser } from 'graphql/mutations'

export class UserListPage extends Component {
  static propTypes = {
    users: PropTypes.array,
    status: PropTypes.string,
    listUser: PropTypes.func,
  }

  state = {
    showModal: false,
    deletingUser: null,
  }

  handleOpenModal = user => {
    this.setState({
      deletingUser: user,
      showModal: true,
    })
  }

  handleConfirmDelete = () => {
    const { deletingUser } = this.state
    this.setState({ deletingUser: null, showModal: false })
    this.handleDeleteUser(deletingUser)
  }

  handleDeleteUser = async user => {
    const { id } = user
    try {
      await this.props.deleteUser({
        variables: { id },
        refetchQueries: [{ query: queryListUser }],
      })
    } catch (error) {
      console.log(error.data)
    }
  }

  toggleModal = () => {
    const { showModal } = this.state
    this.setState({ showModal: !showModal })
  }

  renderContent() {
    const { data } = this.props
    const { loading, user } = data

    const colProps = { lg: 12, className: 'mt-5' }

    const { showModal, deletingUser } = this.state

    const columns = [
      {
        name: 'Id',
        selector: 'id',
        width: '80px',
        sortable: true,
      },
      {
        name: 'Name',
        ignoreRowClick: true,
        allowOverflow: true,
        cell: row => <Link to={`/${row.id}/edit`}>{row.name}</Link>,
      },
      {
        name: 'Username',
        selector: 'username',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        name: 'Birthday',
        selector: 'birthday',
        sortable: true,
        cell: row => moment(+row.birthday).format('YYYY-MM-DD'),
      },
      {
        name: 'Favorite Color',
        selector: 'favoriteColor',
        sortable: true,
      },
      {
        name: 'Join Date',
        sortable: true,
        cell: row => moment(+row.createdAt).format('YYYY-MM-DD HH:mm'),
      },
      {
        name: 'Action',
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        cell: row => (
          <Button color="danger" size="sm" onClick={() => this.handleOpenModal(row)}>
            Delete
          </Button>
        ),
      },
    ]

    return (
      <Container>
        <Row>
          <Col {...colProps}>
            <div className="d-flex align-items-center">
              <h1 className="mr-5">Users</h1>
              <Link to="/new">
                <Button color="primary">Add</Button>
              </Link>
            </div>
          </Col>

          <Col {...colProps}>
            {loading && <Loader color="primary" />}

            <DataTable columns={columns} data={user} pagination highlightOnHover responsive />

            <Modal isOpen={showModal} toggle={this.toggleModal}>
              <ModalBody>{`Do you really want to delete user - ${get(deletingUser, 'name', '')}?`}</ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.handleConfirmDelete}>
                  Yes
                </Button>{' '}
                <Button color="secondary" onClick={this.toggleModal}>
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Container>
    )
  }

  render() {
    return this.renderContent()
  }
}

export default compose(
  graphql(queryListUser),
  graphql(mutationDeleteUser, { name: 'deleteUser' }),
)(UserListPage)
