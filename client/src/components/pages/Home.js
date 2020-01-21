import React, { Fragment, useContext, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Home = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const { destroyAllState } = visaApplicationContext;

  useEffect(() => {
    destroyAllState();
  }, []);
  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1>Welcome to Visa KBRI</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            officia quidem cumque expedita veritatis, ullam commodi mollitia
            repellat optio voluptatibus quaerat explicabo nihil facilis
            necessitatibus dolor doloremque porro repudiandae at.
          </p>
          <Link to='/login'>
            <Button variant='primary'>Apply for visa</Button>
          </Link>
        </Container>
      </Jumbotron>
    </Fragment>
  );
};

export default Home;
