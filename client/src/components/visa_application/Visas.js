import React, { useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layouts/Spinner";
const Visas = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const authContext = useContext(AuthContext);

  const { loading, getAllVisaApp } = visaApplicationContext;
  useEffect(() => {
    authContext.loadUser();
    getAllVisaApp();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row className='my-5'>
        <Col>
          <div>
            <h1>All Visa Applications</h1>
            <p className='lead'>
              Here you can see all of your previous visa applications
            </p>
            <Button size='sm' variant='success'>
              Create a new application
            </Button>
            <hr />
          </div>
        </Col>
        <Col className xs={12}>
          <Card className='my-3' style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant='outline-primary'>Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Visas;
