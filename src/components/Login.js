import React from "react";
import { Form, Button, Container } from "react-bootstrap";

const Login = ({ setFormValue }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setFormValue({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };

  return (
    <Container>
      <h2 className="text-info">Log In</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
