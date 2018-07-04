import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";

const Saved = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <h1>
            <span>
              Check yo self sucka... 
            </span>
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default Saved;
