import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import AuthContext from "../../context/auth/authContext";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const authContext = useContext(AuthContext);
  
  const visaApplicationContext = useContext(VisaApplicationContext);
  const { destroyAllState } = visaApplicationContext;

  const { loginUser, isAuthenticated, loadUser, loading } = authContext;
  useEffect(() => {
    destroyAllState();
    loadUser();
  }, []);
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/visaform");
    }
  }, [isAuthenticated]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      // setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({
        email: email,
        password: password
      });
    }
  };

  if (!isAuthenticated && !loading) {
    return (
      <div>
        <Container>
          <h1 className='my-5 text-center'>Log In</h1>
          <Row>
            <Col>
              <Card style={{ width: "24rem", margin: "0 auto" }}>
                <Card.Body>
                  <Form onSubmit={onSubmit}>
                    <Form.Group controlId='formBasicEmail'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='mail@example.com'
                        required
                        name='email'
                        onChange={onChange}
                      />
                      <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        required
                        minLength='6'
                        name='password'
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Button variant='primary' type='submit'>
                      Log In
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Login;
