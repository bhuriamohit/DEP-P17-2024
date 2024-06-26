import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import logo from "./logo.png";
import "./Application.css";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Application = () => {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const handle_navigate = () => {
    navigate("/Home");
  };

  let user_data = {
    email: email,
  };

  const [result_json, setresult_json] = useState({
    page1: {
      user: {
        page_no: 1,
        name: "",
        email: "",
        Mobile_number: "",
        martial_status: "",
        employee_code_no: "",
        pay: "",
        address: "",
        relation: "",
        place_fell_ill: "",
        ammount_details: "",
        partner_place: "",
      },
    },
    page2: {
      user: {
        page_no: 2,
        name: "",
        email: "",
        numDatesFeeCon: "",
        numDatesFeeInj: "",
        hospitalName: "",
        costMedicine: "",
      },
    },
    page3: {
      user: {
        page_no: 3,
        name: "",
        email: "",
        numDateCon: "",
        amountClaimed: "",
        lessAdvTaken: "",
        netAmntClaimed: "",
        lstOfEncl: "",
        date: "",
      },
    },
    page4: {
      user: {
        date: "",
        email: "",
        medicines: [],
        page_no: 4,
        test: [],
        imgs: [],
      },
    },
  });

  const [result_json2, setResultJson2] = useState({
    0: {
      costMedicine: "-",
      hospitalName: "-",
      name: "-",
      numDatesFeeCon: "-",
      numDatesFeeInj: "-",
    },
  });

  const getData2 = async () => {
    const res2 = await fetch("http://172.30.2.244:5006/get_medical_attendance", {
      method: "POST",
      body: JSON.stringify({
        application_id: localStorage.getItem("application_id"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    let result_json2 = await res2.json();
    result_json2 = JSON.parse(result_json2.text_data);
    setResultJson2(result_json2);
    console.log(result_json2);
  };

  const getData = async () => {
    const res = await fetch("http://172.30.2.244:5006/getData", {
      method: "POST",
      body: JSON.stringify({ user_data }),
      headers: { "Content-Type": "application/json" },
    });

    const result_json = await res.json();
    setresult_json(result_json);
  };
  useEffect(() => {
    getData();
    getData2();
  }, []);

  return (
    <div className="parent">
      <Container>
        <div className="App-header">
          <div id="logo_part">
            <img id="logo" src={logo}></img>
          </div>
          <div>
            <h5>भारतीय प्रौद्योगिकी संस्थान रोपड़</h5>
            <h5>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</h5>
            <h6>रूपनगर, पंजाब-140001, Rupnagar, Punjab-140001</h6>
            <h6>
              Medical Claim Form - For Outdoor (Part A) /Indoor (Part B)
              Treatment
            </h6>
          </div>
        </div>
        <div className="rrr">
          <h5>
            ------------------------------------------------------------------------------------------------------------------------------------------
          </h5>
          <h6>
            Form of application claiming reimbursement of medical expenses
            incurred in connection with medical attendance and/or treatment for
            self and family members/dependents.
          </h6>
        </div>
        <div className="page1">
          <Container>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    1. Name & Designation of Govt. Servant (In Block Letters) -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["name"]
                          ? result_json["page1"]["user"]["name"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    (i) Whether married or unmarried -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["martial_status"]
                          ? result_json["page1"]["user"]["martial_status"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    (ii) If married, the place where wife / husband is employed
                    -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["partner_place"]
                          ? result_json["page1"]["user"]["partner_place"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    2. Mobile number
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["Mobile_number"]
                          ? result_json["page1"]["user"]["Mobile_number"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    3. Employees Code No., Deptt/ Section -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["employee_code_no"]
                          ? result_json["page1"]["user"]["employee_code_no"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    4. Pay of Govt. Servant (Band Pay & Grade Pay) -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["pay"]
                          ? result_json["page1"]["user"]["pay"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    5. Residential address -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["address"]
                          ? result_json["page1"]["user"]["address"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    6. Name of the patient & his /her relationship with the
                    Government Servant (in case of Children state age also) -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["relation"]
                          ? result_json["page1"]["user"]["relation"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    7. Place at which the patient fell ill -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["place_fell_ill"]
                          ? result_json["page1"]["user"]["place_fell_ill"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    8. Details of the amount claimed -
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        backgroundColor: "white",
                        border: "none",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      placeholder={
                        result_json["page1"]["user"]["ammount_details"]
                          ? result_json["page1"]["user"]["ammount_details"]
                          : "-"
                      }
                      readOnly
                    />
                  </Col>
                </div>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </Container>

      <Container>
        <div className="Page2">
          <h2>(I) Medical Attendance</h2>

          {Object.keys(result_json2).map((key, index) => (
            <div key={index}>
              <h3>Medical Attendance {1 + index}</h3>
              <h5>(i) Fee for consultation indicating {1}</h5>
              <Container>
                <Form>
                  <Form.Group as={Row} className="mb-3">
                    <div id="line">
                      <Form.Label id="form_line" column sm="5">
                        (a) the name & designation of the Medical Officer
                        consulted and hospital or dispensary to which attached
                      </Form.Label>
                      <Col id="text" sm="5">
                        <Form.Control
                          type="text"
                          style={{
                            padding: "12px",
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "2px solid black", // Adjust thickness and color as needed
                            borderRadius: "0", // This ensures edges are not rounded
                          }}
                          placeholder={result_json2[key]["name"] || "-"}
                          readOnly
                        />
                      </Col>
                    </div>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <div id="line">
                      <Form.Label id="form_line" column sm="5">
                        (b) the number and dates of consultation and the fee
                        paid for each consultation
                      </Form.Label>
                      <Col id="text" sm="5">
                        <Form.Control
                          type="text"
                          style={{
                            padding: "12px",
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "2px solid black", // Adjust thickness and color as needed
                            borderRadius: "0", // This ensures edges are not rounded
                          }}
                          placeholder={
                            result_json2[key]["numDatesFeeCon"] || "-"
                          }
                          readOnly
                        />
                      </Col>
                    </div>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <div id="line">
                      <Form.Label id="form_line" column sm="5">
                        (c) the number & dates of injection & the fee paid for
                        each injection
                      </Form.Label>
                      <Col id="text" sm="5">
                        <Form.Control
                          type="text"
                          style={{
                            padding: "12px",
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "2px solid black", // Adjust thickness and color as needed
                            borderRadius: "0", // This ensures edges are not rounded
                          }}
                          placeholder={
                            result_json2[key]["numDatesFeeInj"] || "-"
                          }
                          readOnly
                        />
                      </Col>
                    </div>
                  </Form.Group>
                </Form>
              </Container>

              <h5>
                (ii) Charges for pathological, Radiological or other similar
                tests undertaken during diagnosis indicating the test name and
                the charges incurred
              </h5>
              <Container>
                <Form>
                  <Form.Group as={Row} className="mb-3">
                    <div id="line">
                      <Form.Label id="form_line" column sm="5">
                        (a) Name of the hospital or laboratory where any
                        radiological tests were undertaken
                      </Form.Label>
                      <Col id="text" sm="5">
                        <Form.Control
                          type="text"
                          style={{
                            padding: "12px",
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "2px solid black", // Adjust thickness and color as needed
                            borderRadius: "0", // This ensures edges are not rounded
                          }}
                          placeholder={result_json2[key]["hospitalName"] || "-"}
                          readOnly
                        />
                      </Col>
                    </div>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3">
                    <div id="line">
                      <Form.Label id="form_line" column sm="5">
                        <h5>
                          (iii) Cost of medicines purchased from the market :
                        </h5>
                      </Form.Label>
                      <Col id="text" sm="5">
                        <Form.Control
                          type="text"
                          style={{
                            padding: "12px",
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "2px solid black", // Adjust thickness and color as needed
                            borderRadius: "0", // This ensures edges are not rounded
                          }}
                          placeholder={result_json2[key]["costMedicine"] || "-"}
                          readOnly
                        />
                      </Col>
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <h2>(II) Consultation with Specialist</h2>
        <Container>
          <strong>
            Fee paid to specialist or a medical office other than the authorised
            medical attendant indicating
          </strong>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  (a) the name & designation of the Specialist or Medical
                  Officer consulted and the hospital to which attached
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="text"
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderBottom: "2px solid black", // Adjust thickness and color as needed
                      borderRadius: "0", // This ensures edges are not rounded
                    }}
                    placeholder={
                      result_json["page3"]["user"]["name"]
                        ? result_json["page3"]["user"]["name"]
                        : "-"
                    }
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  (b) Number & dates of consultation and the fees paid for each
                  consultation
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="text"
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderBottom: "2px solid black", // Adjust thickness and color as needed
                      borderRadius: "0", // This ensures edges are not rounded
                    }}
                    placeholder={
                      result_json["page3"]["user"]["numDateCon"]
                        ? result_json["page3"]["user"]["numDateCon"]
                        : "-"
                    }
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Total amount claimed
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="text"
                    placeholder={
                      result_json["page3"]["user"]["amountClaimed"]
                        ? result_json["page3"]["user"]["amountClaimed"]
                        : "-"
                    }
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Less advance taken
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="text"
                    placeholder={
                      result_json["page3"]["user"]["lessAdvTaken"]
                        ? result_json["page3"]["user"]["lessAdvTaken"]
                        : "-"
                    }
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Net amount claimed
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="number"
                    placeholder={result_json["page3"]["user"]["netAmntClaimed"]}
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>
            <br></br>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  List of enclosures
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="text"
                    placeholder={
                      result_json["page3"]["user"]["lstOfEncl"]
                        ? result_json["page3"]["user"]["lstOfEncl"]
                        : "-"
                    }
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Date
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="Date"
                    defaultValue={result_json.page3.user.date}
                    readOnly
                  />
                </Col>
              </div>
            </Form.Group>

            <br />
            <br></br>

            <table id="table1" responsive="sm">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name of Medicine(s)</th>
                  <th>Price(Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {result_json["page4"]["user"]["medicines"].map((med, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{med.medicine}</td>
                    <td>{med.price1}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
            <table id="table2" responsive="sm">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name of Test(s)</th>
                  <th>Price(Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {result_json["page4"]["user"]["test"].map(
                  (test_item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{test_item.test}</td>
                      <td>{test_item.price2}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <br></br>
            <br></br>
            {result_json["page4"]["user"]["imgs"].map((img) => (
              <figure style={{ textAlign: "center" }}>
                <img
                  alt=""
                  src={img.url}
                  class="figure-img img-fluid rounded"
                ></img>
                <figcaption style={{ color: "black" }} class="figure-caption">
                  <b>
                    <i>{img.name}</i>
                  </b>
                </figcaption>
              </figure>
            ))}
            <br />
            <br></br>
            <div id="nav_btn">
              <Button onClick={window.print} type="button">
                Print application
              </Button>

              <Button
                onClick={handle_navigate}
                type="button"
                style={{ marginLeft: "400px" }}
              >
                Return to Home
              </Button>
            </div>
            <br />
            <br />
          </Form>
        </Container>
      </Container>
    </div>
  );
};
export default Application;
