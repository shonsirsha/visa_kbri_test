import React, { useEffect, useContext, useState, Fragment } from "react";
import { Container, Row, Form, Button, Card, Nav } from "react-bootstrap";
import uniqid from "uniqid";

import isEmpty from "../../utils/isEmpty";

import AuthContext from "../../context/auth/authContext";
// import { Link } from "react-router-dom";
import VisaApplicationContext from "../../context/visa_application/visaApplicationContext";

import Spinner from "../layouts/Spinner";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
const appId = uniqid("Application-");

const Application = () => {
  const authContext = useContext(AuthContext);
  const visaApplicationContext = useContext(VisaApplicationContext);
  const {
    saved,
    saveToDb,
    loading,
    setApplicationIdToState
  } = visaApplicationContext;
  const { loadUser, user, isAuthenticated } = authContext;
  useEffect(() => {
    loadUser();
    setApplicationIdToState(appId);
  }, []);

  const [currentTab, setCurrentTab] = useState(1);

  const onSubmit = e => {
    e.preventDefault();
    if (currentTab === 3) {
      saveToDb({ status: "finished" });
    }
  };

  const onKeyDown = e => {
    try {
      if (e.keyCode === 13) {
        document.getElementById(e.target.id).blur();
        if (currentTab !== 3) {
          clickTab(currentTab + 1);
        } else {
        }
      }
    } catch (e) {}
  };

  const onSelectTab = num => {
    if (num !== currentTab) {
      setCurrentTab(num);
      saveToDb({ status: "unfinished" });
    }
  };

  const clickTab = num => {
    try {
      const tabs = document.getElementsByClassName("myTab");
      tabs[num - 1].click();
    } catch (e) {}
  };

  const loadingSpinner = (
    <Fragment>
      <Spinner />
    </Fragment>
  );

  const forms = (
    <Form onKeyDown={onKeyDown} onSubmit={onSubmit}>
      {currentTab === 1 && <Step1 />}
      {currentTab === 2 && <Step2 />}
      {currentTab === 3 && <Step3 />}

      <div
        style={{
          textAlign: "center"
        }}
      >
        {currentTab > 1 && (
          <Button
            variant='outline-primary'
            style={{ marginRight: "8px" }}
            onClick={() => clickTab(currentTab - 1)}
          >
            Previous
          </Button>
        )}
        {currentTab <= 2 && (
          <Button variant='primary' onClick={() => clickTab(currentTab + 1)}>
            Next
          </Button>
        )}

        {currentTab == 3 && (
          <Button variant='success' type='submit'>
            Submit & Apply
          </Button>
        )}
      </div>
    </Form>
  );

  if (isAuthenticated && !authContext.loading) {
    return (
      <div>
        <Container>
          <div className='my-5'>
            <Nav fill variant='tabs' defaultActiveKey={`tab-1`}>
              <Nav.Item id={`tab-1`}>
                <Nav.Link
                  className='myTab'
                  onClick={() => onSelectTab(1)}
                  eventKey='tab-1'
                >
                  <h4>1. Personal</h4>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item id={`tab-2`}>
                <Nav.Link
                  className='myTab'
                  onClick={() => onSelectTab(2)}
                  eventKey='tab-2'
                >
                  <div id='aw'></div>
                  <h4>2. Travel</h4>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item id={`tab-3`}>
                <Nav.Link
                  className='myTab'
                  onClick={() => onSelectTab(3)}
                  eventKey='tab-3'
                >
                  <h4>3. Passport</h4>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Row className='my-5 ' style={{ margin: "0 auto" }}>
            <p>
              Application ID: <kbd>{appId}</kbd>
              <br />
              <span style={{ color: saved ? "green" : "red" }}>
                {saved ? "Saved" : "Not Saved"}
              </span>
            </p>

            <Card style={{ width: "100%", margin: "0 auto" }}>
              <Card.Body>{loading ? loadingSpinner : forms}</Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Application;
