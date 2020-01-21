//travel

import React, { Fragment, useContext, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Step3 = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const {
    setApplicationToState,
    passportNumber,
    unsaveWhileTyping
  } = visaApplicationContext;

  const [application, setApplication] = useState({
    passportNumber: passportNumber
  });

  useEffect(() => {
    setApplication({
      passportNumber: passportNumber
    });
  }, []);

  const onChange = e => {
    setApplication({ ...application, [e.target.name]: e.target.value });
    unsaveWhileTyping();
  };

  const onBlur = () => {
    setApplicationToState(application, 3);
  };

  return (
    <Fragment>
      <Form.Group controlId='formDestination'>
        <Form.Label>Passport Number</Form.Label>
        <Form.Control
          type='text'
          placeholder='Passport Number'
          name='passportNumber'
          onChange={onChange}
          onBlur={onBlur}
          value={application.passportNumber}
        />
      </Form.Group>
    </Fragment>
  );
};

export default Step3;
