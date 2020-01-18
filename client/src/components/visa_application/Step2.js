//travel

import React, { Fragment, useContext, useState } from "react";
import { Form } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Step2 = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const { setApplicationToState, destination } = visaApplicationContext;

  const [application, setApplication] = useState({
    destination: destination
  });

  const onChange = e => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const onBlur = () => {
    setApplicationToState(application, 2);
  };

  return (
    <Fragment>
      <Form.Group controlId='formDestination'>
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type='text'
          placeholder='Destination'
          required
          name='destination'
          onChange={onChange}
          onBlur={onBlur}
          value={application.destination}
        />
      </Form.Group>
    </Fragment>
  );
};

export default Step2;
