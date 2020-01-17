import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
const Login = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      loginUser({
        email: email,
        password: password
      });
    }

  return (
    <div>
      <Container>
        <h1 className='my-5 text-center'>Log In</h1>
        <Row>
          <Col>
            <Card style={{ width: "24rem", margin: "0 auto" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='mail@example.com'
                      required
                      name='email'
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
                      minlength='6'
                      name='password'
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
};

export default Login;
