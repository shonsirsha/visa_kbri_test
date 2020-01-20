import React, { Fragment, useState, useContext, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

const Alerts = () => {
  const [show, setShow] = useState(true);

  const [arrErr, setArrErr] = useState([]);

  const visaApplicationContext = useContext(VisaApplicationContext);
  const { visaApplicationErrs } = visaApplicationContext;

  let x = 0;
  const friendlyNames = {
    firstName: "First Name",
    lastName: "Last Name",
    destination: "Destination",
    passportNumber: "Passport Number"
  };

  useEffect(() => {
    if (visaApplicationErrs.length > 0) {
      Object.keys(friendlyNames).map((key, index) => {
        visaApplicationErrs.map((theError, ix) => {
          if (theError === key) {
            visaApplicationErrs[ix] = friendlyNames[key];
          }
        });
      });
    }

    setArrErr(visaApplicationErrs.reverse());

    console.log(visaApplicationErrs);
    x = 1;
  }, [visaApplicationErrs]);

  if (arrErr.length > 0) {
    return (
      <Container>
        <div className='my-5' style={{ width: "100%" }}>
          <Alert variant='danger' onClose={() => setArrErr([])} dismissible>
            <h4>
              {" "}
              Please enter the following before submitting your application:
            </h4>

            <p>
              {arrErr.length > 0
                ? arrErr.length !== 1 || arrErr[0] !== "fillAll"
                  ? arrErr.map((err, ix) => (
                      <span>
                        {ix + 1}. {err}
                        <br />
                      </span>
                    ))
                  : Object.keys(friendlyNames).map((key, index) => (
                      <span>
                        {index + 1}
                        {". "}
                        {friendlyNames[key]}
                        <br />
                      </span>
                    ))
                : null}
            </p>
          </Alert>
        </div>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default Alerts;
