import React, { Fragment } from "react";
import { Navbar } from "react-bootstrap";
import Logo from "./logo.svg";
const MyNavbar = () => {
  return (
    <Fragment>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>
          <img
            alt=''
            src={Logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />
          {"   "}
          Visa KBRI
        </Navbar.Brand>
      </Navbar>
    </Fragment>
  );
};

export default MyNavbar;
