import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'

const NotFoundPage = () => (
  <Container>
    <Row>
      <Col lg={12}>
        <h1>Not Found</h1>
      </Col>
      <Col lg={12}>
        <Link to="/">
          <Button color="primary">Back</Button>
        </Link>
      </Col>
    </Row>
  </Container>
)

export default NotFoundPage
