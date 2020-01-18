//personal

import React, { Fragment, useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Step1 = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const {
    setApplicationToState,
    firstName,
    lastName,
    unsaveWhileTyping
  } = visaApplicationContext;

  const [application, setApplication] = useState({
    firstName: firstName,
    lastName: lastName
  });

  const onChange = e => {
    setApplication({ ...application, [e.target.name]: e.target.value });
    unsaveWhileTyping();
  };

  const onBlur = () => {
    setApplicationToState(application, 1);
  };

  return (
    <Fragment>
      <Form.Group controlId='formFirstName'>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='John'
          name='firstName'
          onChange={onChange}
          onBlur={onBlur}
          value={application.firstName}
        />
      </Form.Group>

      <Form.Group controlId='formLastName'>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Doe'
          name='lastName'
          onChange={onChange}
          onBlur={onBlur}
          value={application.lastName}
        />
      </Form.Group>
    </Fragment>
  );
};

export default Step1;
