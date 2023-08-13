import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NaviTab from "./navbar";
import Button from "react-bootstrap/Button";
import "./Phone.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signup() {
  const history = useNavigate();
  const [Login_data, setLogin_data] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex =
    /^ (?=.* [0 - 9])(?=.* [a - z])(?=.* [A - Z])(?=.* [@#$ %^& -+=()])(?=\\S + $).{ 8, 20 } $/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  async function submit(e) {
    e.preventDefault();

    console.log(error);
    // if (emailRegex.test(Login_data) == false)
    //   return setError("please enter a valid email");

    // if (passwordRegex.test(password) == false)
    //   return setError("please enter valid password");

    try {
      console.log(Login_data, password);
      await axios
        .post("http://localhost:8000/signup", {
          Login_data,
          password,
        })

        .then((res) => {
          if (res.data == "exist") {
            alert("user already exist");
          } else if (res.data == "notexist") {
            history("/login", { state: { id: Login_data } });
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
      <div className="login">
        {/* <NaviTab></NaviTab> */}
        <Row>
          <Col>
            <h1 className="btn1">Register</h1>
          </Col>
        </Row>
        <form action="POST" className="inside_con">
          <Row className="spl_btn">
            <Col>
              {" "}
              <Button className="spl1" href="/">
                Email
              </Button>
            </Col>
            <Col>
              <Button className="spl1" href="/phone">
                Phone
              </Button>
            </Col>
          </Row>
          <br />
          {error.length > 0 && (
            <div style={{ marginBottom: "10px", color: "red" }}>{error}</div>
          )}

          <label htmlFor="Email">Email*</label>
          <br />
          <input
            type="tel"
            onChange={(e) => {
              setLogin_data(e.target.value);
            }}
            placeholder=""
            name="Email"
            id=""
          />
          <br />
          <label htmlFor="password">PASSWORD*</label>
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=""
            name="password"
            id=""
          />
          <br />
          <label htmlFor="confirmpassword">CONFIRM PASSWORD*</label>
          <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=""
            name="confirmpassword"
            id=""
          />
          <br />

          <Button className="smt_btn" type="submit" onClick={submit}>
            Submit
          </Button>
        </form>
        <br></br>
      </div>
    </Container>
  );
}
export default Signup;
