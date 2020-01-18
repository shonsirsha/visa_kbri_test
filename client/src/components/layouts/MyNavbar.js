import React, { Fragment, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./logo.svg";

import AuthContext from "../../context/auth/authContext";

const MyNavbar = () => {
  const authContext = useContext(AuthContext);
  const { logoutUser, isAuthenticated } = authContext;
  const onLogout = () => {
    logoutUser();
  };
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
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuthenticated ? (
              <Nav.Link href='#!' onClick={onLogout}>
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default MyNavbar;
