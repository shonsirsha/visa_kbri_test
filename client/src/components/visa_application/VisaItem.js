import React, { Fragment } from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";

const VisaItem = ({ singleApp: { status, appId } }) => {
  return (
    <Fragment>
      <Col className xs={12}>
        <Card className='my-3' style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              <Badge
                className='my-2'
                variant={status === "unfinished" ? "warning" : "success"}
              >
                {status === "unfinished" ? (
                  <span>Unfinished</span>
                ) : (
                  <span>Finished & applied</span>
                )}
              </Badge>
              <br />
              Application ID: <kbd>{appId}</kbd>
            </Card.Title>
            <Card.Text>
              <p className='muted'>
                Created on: <b>Date</b>
                <br />
                Last edited: <b>Date</b>
              </p>
            </Card.Text>
            <Button
              href={
                status === "unfinished"
                  ? `/visaform/${appId}`
                  : `/application/${appId}`
              }
              variant={status === "unfinished" ? "warning" : "success"}
            >
              {status === "unfinished" ? (
                <span> Complete application</span>
              ) : (
                <span> See application</span>
              )}
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default VisaItem;
