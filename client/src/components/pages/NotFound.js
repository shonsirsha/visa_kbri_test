import React from "react";
import { Container, Row, Card, Nav } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <div className='my-5' style={{ margin: "0 auto" }}>
          <h1>Oopsie... not found</h1>
        </div>
      </Row>
    </Container>
  );
};

export default NotFound;
