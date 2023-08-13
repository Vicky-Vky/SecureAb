import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { useNavigate, Link } from "react-router-dom";
import NaviTab from "./navbar";
import { Button, Container } from "react-bootstrap";
import "./Login.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Login() {
  const history = useNavigate();
  const [Login_data, setLogin_data] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    try {
      await axios
        .post("http://localhost:8000/login", {
          Login_data,
          password,
        })
        .then((res) => {
          if (res.data) {
            if (
              res.data.Login_data == Login_data &&
              res.data.password == password
            ) {
              history("/dashboard", { state: { id: Login_data } });
            } else {
              alert("User Name and Password invalid!!");
            }
          } else if (res.data == "notexist") {
            alert("user is not signup in");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Container>
      {/* <NaviTab></NaviTab> */}
      <Row>
        <Col>
          <h1 className="btn1">Login</h1>
        </Col>
      </Row>
      <form action="POST" className="inside_con1">
        <input
          type="text"
          onChange={(e) => {
            setLogin_data(e.target.value);
          }}
          placeholder="Email"
          name=""
          id=""
        />
        <br />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          name=""
          id=""
        />
        <br />
        <Button className="btn2" type="submit" onClick={submit}>
          Submit
        </Button>
      </form>

      <p className="btn3">OR</p>
      <br />
      <Button className="btn4" href="/signup">
        Signup
      </Button>
    </Container>
  );
}
export default Login;
