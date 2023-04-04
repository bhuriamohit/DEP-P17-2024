import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useNavigate,
} from "react-router-dom";

import { Button, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Home_authority.css";
//import { signInWithGoogle } from "./firebase"
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap";
import ShowApplication from "./ShowApplication";
import { AuthContext } from "./Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function AO_verified_applications() {
  const email = localStorage.getItem("email");

  let user_data = {
    email: email,
  };
  const [result_arr, setresult_arr] = useState([]);

  const getApplicationId = async () => {
    const res = await fetch(
      "http://127.0.0.1:5000/getallApprovedApplicationIdFromAO",
      {
        method: "POST",
        body: JSON.stringify({ user_data }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    console.log(data["result"]);

    setresult_arr(data["result"]);
  };
  useEffect(() => {
    getApplicationId();
  }, []);

  console.log(result_arr);

  let navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const gotoForgotPassword = () => {
    navigate("/forgotPassword");
  };
  return (
    <div>
      <div id="top_navbar">
        {/*<Link to="/Page1" style={{ textDecoration: "none" }}> 
                    <div id="apply_button"> Apply for Reimbursement</div>
                </Link>*/}

        <div id="name">Welcome</div>
        <div id="email">{email}</div>
      </div>

      <div
        id="sidebar"
        class="d-flex flex-column  flex-shrink-0 p-3 text-white"
      >
        <a href="#" class="text-white text-decoration-none">
          <h2 class="text_center">Menu</h2>
        </a>
        <br />
        <ul class="nav nav-pills flex-column mb-auto">
          <div
            id="link_to_other_pages"
            onClick={handleNavigate}
            style={{ textDecoration: "none" }}
          >
            <li class="nav-item">
              <a href="#" class="nav-link text-white" aria-current="page">
                <i class="fa fa-home"></i>
                <span class="ms-2 font_size_18">Home </span>
              </a>
            </li>
          </div>

          <li>
            <a href="#" class="nav-link active">
              <i class="fa fa-first-order"></i>
              <span class="ms-2 font_size_18">Verified Applications</span>
            </a>
          </li>

          <li onClick={gotoForgotPassword}>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-cog"></i>
              <span class="ms-2 font_size_18">Change Password</span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-bookmark"></i>
              <span class="ms-2 font_size_18">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div id="last_heading">
        <h4>Verfied applications </h4>
        <h6>(applications which are approved by you will appear here)</h6>
      </div>
      <div className="application_list">
        {result_arr.map((id) => (
          <div
            className="application_id"
            onClick={() => {
              navigate("ShowAllApplication/" + id);
            }}
            style={{ cursor: "pointer" }}
          >
            <Container>
              <Row>
                <h6>Application Id : {id[0]}</h6>
                {console.log()}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Date of application : {JSON.parse(id[1]).user.date}</div>
                  <div>
                    Amount claimed : {JSON.parse(id[1]).user.netAmntClaimed}
                  </div>
                </div>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AO_verified_applications;
