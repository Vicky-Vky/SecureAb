import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";


function NaviTab() {
  return (
    <div>
      <Navbar expand="xxl" bg="lgiht" variant="light" className="nav_bar">
        <Container>
          <Navbar.Brand href="/">Trading Site</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z" />
              </svg>
              Home
            </Nav.Link>
            <Nav.Link href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M80 896v-94q0-34 17-62.5t51-43.5q72-32 132-46t120-14q29 0 61.5 3.5T528 652l-49 49q-20-2-39.5-3.5T400 696q-58 0-105.5 10.5T172 750q-17 8-24.5 23t-7.5 29v34h319l60 60H80Zm545 16L484 771l42-42 99 99 213-213 42 42-255 255ZM400 574q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm59 262Zm-59-322q39 0 64.5-25.5T490 424q0-39-25.5-64.5T400 334q-39 0-64.5 25.5T310 424q0 39 25.5 64.5T400 514Zm0-90Z" />
              </svg>
              Signup
            </Nav.Link>
            <Nav.Link href="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z" />
              </svg>
              Login
            </Nav.Link>
            <Nav.Link href="/about">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="48"
              >
                <path d="M290 766h140V626H290v140Zm240 0h140V626H530v140ZM290 526h140V386H290v140Zm240 0h140V386H530v140ZM180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm0-600v600-600Z" />
              </svg>
              About
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
  );
}

export default NaviTab;
