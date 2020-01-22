import React, { Fragment, useEffect, useState, useContext } from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";
import AuthContext from "../../context/auth/authContext";
import NotFound from "../pages/NotFound";

import Spinner from "../layouts/Spinner";
const VisaItem = props => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const authContext = useContext(AuthContext);

  const { getSingleVisaAppById, firstName, notFound } = visaApplicationContext;

  useEffect(() => {
    authContext.loadUser();
    if (typeof props.match.params.visaAppId !== "undefined") {
      getSingleVisaAppById(props.match.params.visaAppId, "allApplications");
    }
    console.log(props.match.params.visaAppId);
  }, []);

  if (authContext.loading) {
    return <Spinner />;
  }

  if(notFound){
      return <NotFound/>
  }

  return (
    <Fragment>
      <Col>
        <Card className='my-3' style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              <p>
                First name: <b>{firstName}</b>
                <br />
                etc..
              </p>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default VisaItem;
