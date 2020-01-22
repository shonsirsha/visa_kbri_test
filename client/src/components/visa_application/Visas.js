import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";
import AuthContext from "../../context/auth/authContext";

import VisaItem from "../visa_application/VisaItem";
import Spinner from "../layouts/Spinner";
const Visas = () => {
  const visaApplicationContext = useContext(VisaApplicationContext);
  const authContext = useContext(AuthContext);
  const [localAllApps, setLocalAllApps] = useState([]);

  const {
    loading,
    getAllVisaApp,
    allApplications,
    destroyAllState
  } = visaApplicationContext;
  const { isAuthenticated } = authContext;

  useEffect(() => {
    destroyAllState();
    authContext.loadUser();
    getAllVisaApp();
    if (allApplications.length == 0) {
      getAllVisaApp();
    }
  }, []);

  //   useEffect(() => {
  //     setLocalAllApps(allApplications);
  //     console.log(localAllApps);
  //     console.log(allApplications);
  //   }, [allApplications]);

  return authContext.loading && !isAuthenticated ? (
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
            <Button href='/visaform' size='sm' variant='success'>
              Create a new application
            </Button>
            <hr />
          </div>
        </Col>
        {!visaApplicationContext.loading ? (
          allApplications.length > 0 ? (
            allApplications.map(singleApp => (
              <VisaItem key={singleApp.appId} singleApp={singleApp} />
            ))
          ) : (
            <Col xs={12}>
              <p className='lead'>No applications yet.</p>
            </Col>
          )
        ) : (
          <Col xs={12}>
            <Spinner />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Visas;
