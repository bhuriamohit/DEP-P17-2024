import React, {
  useMemo,
  Component,
  useEffect,
  useState,
  useContext,
} from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AuthContext } from "./Auth";
import "./Application.css";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

import { Button, Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import logo from "./logo.png";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function ShowApplication() {
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate("/Home");
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const acceptedFileItems = acceptedFiles.map((file, index) => (
    <li key={file.path}>
      {typeof file} {file.path} -{" "}
      <a href={URL.createObjectURL(file)} target="_blank">
        {file.path}
      </a>
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  let { id } = useParams();
  let user_data = {
    email: email,
    application_id: id,
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

  const [rslt, setrslt] = useState({
    current_auth: "",
    current_auth_remarks: "",
    isHold: "no",
  });

  const [responses1, setResponses1] = useState([]);
  const [responses2, setResponses2] = useState([]);
  const [date, setDate] = useState([]);
  const [urls, setUrls] = useState([]);
  const [alrt, setAlert] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingIndex2, setEditingIndex2] = useState(null);
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
      body: JSON.stringify({ application_id: id }),
      headers: { "Content-Type": "application/json" },
    });

    let result_json2 = await res2.json();
    result_json2 = JSON.parse(result_json2.text_data);
    setResultJson2(result_json2);
    console.log(result_json2);
  };

  const getData = async () => {
    const res = await fetch("http://172.30.2.244:5006/showApplicationId/" + id, {
      method: "POST",
      body: JSON.stringify({ user_data }),
      headers: { "Content-Type": "application/json" },
    });

    const result_json = await res.json();
    setresult_json(result_json);
    console.log("line 97", result_json);
    console.log("line 9999", result_json.page4.user.medicines);

    setResponses1(result_json.page4.user.medicines);
    console.log("line 888", responses1);
    setResponses2(result_json.page4.user.test);

    setUrls(result_json.page4.user.imgs);
  };
  useEffect(() => {
    getData();
    getData2();
  }, []);

  
  const toggleEdit = (index) => {
    setEditingIndex(index);
  };
  const toggleEdit2 = (index) => {
    setEditingIndex2(index);
  };
  console.log(result_json);

  const getStatus = async () => {
    const res2 = await fetch(
      "http://172.30.2.244:5006/showApplicationIdStatus/" + id,
      {
        method: "POST",
        body: JSON.stringify({ user_data }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const rslt = await res2.json();
    setrslt(rslt);
    console.log(rslt);
  };
  useEffect(() => {
    getStatus();
  }, []);

  console.log(rslt);

  const [row1, setRow1] = useState({
    medicine: "",
    price1: "",
  });

  const [row2, setRow2] = useState({
    test: "",
    price2: "",
  });

  const [edit_tab1, setTab1] = useState({
    s_no1: "",
    medicine1: "",
    price_1: "",
  });

  const [edit_tab2, setTab2] = useState({
    s_no2: "",
    test1: "",
    price_2: "",
  });

  const handleChange1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRow1({ ...row1, [name]: value });
    //console.log(row);
  };

  const handleChange2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRow2({ ...row2, [name]: value });
    console.log(name, value);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (row1.medicine != "" && row1.price1 != "") {
      responses1.push(row1);
      setResponses1(responses1);
      setRow1({ medicine: "", price1: "" });
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (row2.test != "" && row2.price2 != "") {
      responses2.push(row2);
      setResponses2(responses2);
      setRow2({ test: "", price2: "" });
    }
  };

  const handleChangeInRow = (e, index) => {
    const { name, value } = e.target;
    const newResponses = [...responses1];
    newResponses[index] = { ...newResponses[index], [name]: value };
    setResponses1(newResponses);
  };
  const handleChangeInRow2 = (e, index) => {
    const { name, value } = e.target;
    const newResponses = [...responses2];
    newResponses[index] = { ...newResponses[index], [name]: value };
    setResponses2(newResponses);
  };

  const saveEdit = (index) => {
    setEditingIndex(null);
  };
  const saveEdit2 = (index) => {
    setEditingIndex2(null);
  };
  // Adjust deleteRow to handle both tables
  const deleteRow = (index) => {
    const newResponses = [...responses1].filter((_, i) => i !== index);
    setResponses1(newResponses);
    if (index === editingIndex) {
      setEditingIndex(null); // Reset if the currently edited row is deleted
    }
  };

  const deleteRow2 = (index) => {
    const newResponses = [...responses2].filter((_, i) => i !== index);
    setResponses2(newResponses);
    if (index === editingIndex) {
      setEditingIndex2(null); // Reset if the currently edited row is deleted
    }
  };


  const handleupload = async () => {
    // const email = email
    // const id = user_data.application_id

    const promises = [];
    acceptedFiles.map((image, index) => {
      const img = { name: "", url: "" };
      const storageRef = ref(
        storage,
        `${user_data.application_id}/${image.name}`
      );
      img["name"] = image.name;

      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },

        (error) => {
          console.log(error);
        },

        async () => {
          await getDownloadURL(storageRef).then((url) => {
            console.log(url);
            img["url"] = url;
            setUrls((prevState) => [...prevState, img]);
          });
        }
      );
    });

    Promise.all(promises).then(() => alert("All new images are uploaded!!"));
  };

  const resubmit_application = async (e) => {
    e.preventDefault();

    setresult_json({
      ...result_json,
      page4: {
        ...result_json.page4,
        user: {
          ...result_json.page4.user,
          medicines: responses1,
          test: responses2,
          imgs: urls,
        },
      },
    });

    console.log("line 233", responses1);
    console.log("line 253", responses2);
    console.log("line 381", result_json);
    console.log("line 382", urls);

    const new_obj = {
      ...result_json,
      page4: {
        ...result_json.page4,
        user: {
          ...result_json.page4.user,
          medicines: responses1,
          test: responses2,
          imgs: urls,
        },
      },
    };
    console.log("newobj", new_obj);

    if (
      !new_obj.page1.user.name ||
      !new_obj.page1.user.email ||
      !new_obj.page1.user.Mobile_number ||
      !new_obj.page1.user.partner_place ||
      !new_obj.page1.user.martial_status ||
      !new_obj.page1.user.employee_code_no ||
      !new_obj.page1.user.pay ||
      !new_obj.page1.user.address ||
      !new_obj.page1.user.relation ||
      !new_obj.page1.user.place_fell_ill ||
      !new_obj.page1.user.ammount_details ||
      !new_obj.page3.user.amountClaimed ||
      !new_obj.page3.user.netAmntClaimed
    ) {
      alert(
        "Fields which are marked as 'required' are compulsory to fill.\nMake sure you fill them all."
      );
    } else {
      const res4 = await fetch("http://172.30.2.244:5006/resubmitApplication", {
        method: "POST",
        body: JSON.stringify({
          ...new_obj,
          application_id: user_data.application_id,
          authorityUser: rslt.current_auth,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const msg = await res4.json();
      console.log(msg);

      console.log(res4);
      navigate("/Home");
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
                    1. Name & Designation of Govt. Servant (In Block Letters) -{" "}
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.name}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              name: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    (i) Whether married or unmarried -
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.martial_status}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              martial_status: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    (ii) If married, the place where wife / husband is employed
                    - <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Col id="text" sm="3">
                    <Form.Control
                      type="text"
                      style={{
                        padding: "12px",
                        border: "none",
                        backgroundColor: "white",
                        borderBottom: "2px solid black", // Adjust thickness and color as needed
                        borderRadius: "0", // This ensures edges are not rounded
                      }}
                      defaultValue={result_json.page1.user.partner_place}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              partner_place: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    2. Mobile number <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.Mobile_number}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              Mobile_number: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    3. Employees Code No., Deptt/ Section -
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.employee_code_no}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              employee_code_no: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    4. Pay of Gvt. Servant(Band Pay & Grade Pay)
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.pay}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              pay: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    5. Residential address -{" "}
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.address}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              address: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    6. Name of the patient & his /her relationship with the
                    Government Servant (in case of Children state age also) -
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.relation}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              relation: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    7. Place at which the patient fell ill -
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.place_fell_ill}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              place_fell_ill: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
                    />
                  </Col>
                </div>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <div id="line">
                  <Form.Label id="form_line" column sm="4">
                    8. Details of the amount claimed -
                    <span style={{ color: "red" }}>*</span>
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
                      defaultValue={result_json.page1.user.ammount_details}
                      onChange={(e) =>
                        setresult_json({
                          ...result_json,
                          page1: {
                            ...result_json.page1,
                            user: {
                              ...result_json.page1.user,
                              ammount_details: e.target.value,
                            },
                          },
                        })
                      }
                      readOnly={rslt["isHold"] === "no"}
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
                    defaultValue={result_json.page3.user.name}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            name: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
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
                    defaultValue={result_json.page3.user.numDateCon}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            numDateCon: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Total amount claimed <span style={{ color: "red" }}>*</span>
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
                    defaultValue={result_json.page3.user.amountClaimed}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            amountClaimed: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
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
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderBottom: "2px solid black", // Adjust thickness and color as needed
                      borderRadius: "0", // This ensures edges are not rounded
                    }}
                    defaultValue={result_json.page3.user.lessAdvTaken}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            lessAdvTaken: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  Net amount claimed <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Col id="text" sm="5">
                  <Form.Control
                    type="number"
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderBottom: "2px solid black", // Adjust thickness and color as needed
                      borderRadius: "0", // This ensures edges are not rounded
                    }}
                    defaultValue={result_json.page3.user.netAmntClaimed}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            netAmntClaimed: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
                  />
                </Col>
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <div id="line">
                <Form.Label id="form_line" column sm="5">
                  List of enclosures
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
                    defaultValue={result_json.page3.user.lstOfEncl}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            lstOfEncl: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
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
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      border: "none",
                      borderBottom: "2px solid black", // Adjust thickness and color as needed
                      borderRadius: "0", // This ensures edges are not rounded
                    }}
                    defaultValue={result_json.page3.user.date}
                    onChange={(e) =>
                      setresult_json({
                        ...result_json,
                        page3: {
                          ...result_json.page3,
                          user: {
                            ...result_json.page3.user,
                            date: e.target.value,
                          },
                        },
                      })
                    }
                    readOnly={rslt["isHold"] === "no"}
                  />
                </Col>
              </div>
            </Form.Group>

            <br />

            <br />
            <br />

            {rslt["isHold"] === "yes" && (
              <div>
                
              </div>
            )}

            <h4 style={{ "text-align": "center" }}>Table1 For Medicines</h4>
            <table id="table1" responsive="sm">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name of Medicine(s)</th>
                  <th>Price(Rs.)</th>
                </tr>
              </thead>

              <tbody>
                {responses1.map((response, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{response.medicine}</td>
                    <td>{response.price1}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
            {rslt["isHold"] === "yes" && (
              <div>
               
              </div>
            )}

            <br></br>
            {rslt["isHold"] === "yes" && (
              <div>
        
              </div>
            )}
            <br />
            <h4 style={{ "text-align": "center" }}>Table2 For Tests</h4>
            <table id="table2" responsive="sm">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name of Test(s)</th>
                  <th>Price(Rs.)</th>
                </tr>
              </thead>

              <tbody>
                {responses2.map((response, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{response.test}</td>
                    <td>{response.price2}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br />

            {rslt["isHold"] === "yes" && (
              <div>
               <h4>Medicine Table</h4>
            <table className="medicine-table">
              <thead>
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">Name of Medicine(s)</th>
                  <th scope="col">Price(Rs.)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses1.map((response, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="medicine"
                          className="form-control"
                          value={response.medicine}
                          onChange={(e) => handleChangeInRow(e, index)}
                        />
                      ) : (
                        response.medicine
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="price1"
                          className="form-control"
                          value={response.price1}
                          onChange={(e) => handleChangeInRow(e, index)}
                        />
                      ) : (
                        response.price1
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <>
                          <button className="save-button" onClick={saveEdit}>
                            Save
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteRow(index)}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit-button"
                            onClick={() => toggleEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteRow(index)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form className="bottom-insert-form">
              <div className="insert-row">
                <div className="insert-col">
                  <input
                    type="text"
                    className="insert-input"
                    placeholder="Medicine Name"
                    name="medicine"
                    value={row1.medicine}
                    onChange={handleChange1}
                  />
                </div>
                <div className="insert-col">
                  <input
                    type="text"
                    className="insert-input"
                    placeholder="Price"
                    name="price1"
                    value={row1.price1}
                    onChange={handleChange1}
                  />
                </div>
                <div className="insert-col-auto">
                  <button
                    type="submit"
                    className="insert-button"
                    onClick={handleSubmit1}
                  >
                    Insert row
                  </button>
                </div>
              </div>
            </form>
            <h4>Test Table</h4>
            <table className="medicine-table">
              <thead>
                <tr>
                  <th scope="col">S.NO</th>
                  <th scope="col">Name of Test(s)</th>
                  <th scope="col">Price(Rs.)</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses2.map((response, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {editingIndex2 === index ? (
                        <input
                          type="text"
                          name="test"
                          className="form-control"
                          value={response.test}
                          onChange={(e) => handleChangeInRow2(e, index)}
                        />
                      ) : (
                        response.test
                      )}
                    </td>
                    <td>
                      {editingIndex2 === index ? (
                        <input
                          type="text"
                          name="price2"
                          className="form-control"
                          value={response.price2}
                          onChange={(e) => handleChangeInRow2(e, index)}
                        />
                      ) : (
                        response.price2
                      )}
                    </td>
                    <td>
                      {editingIndex2 === index ? (
                        <>
                          <button
                            className="save-button"
                            onClick={() => saveEdit2(index)}
                          >
                            Save
                          </button>
                          <button
                            className="cancel-button"
                            onClick={() => toggleEdit2(index)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="edit-button"
                            onClick={() => toggleEdit2(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteRow2(index)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form className="bottom-insert-form" onSubmit={handleSubmit2}>
              {" "}
              {/* Use onSubmit to properly handle form submission */}
              <div className="insert-row">
                <div className="insert-col">
                  <input
                    type="text"
                    className="insert-input"
                    placeholder="Test Name"
                    name="test"
                    value={row2.test}
                    onChange={handleChange2}
                  />
                </div>
                <div className="insert-col">
                  <input
                    type="text"
                    className="insert-input"
                    placeholder="Price"
                    name="price2"
                    value={row2.price2}
                    onChange={handleChange2}
                  />
                </div>
                <div className="insert-col-auto">
                  <button type="submit" className="insert-button">
                    Insert row
                  </button>
                </div>
              </div>
            </form>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            ></h2>
              </div>
            )}

            <br></br>
            {result_json["page4"]["user"]["imgs"].map((img) => (
              <figure style={{ textAlign: "center" }}>
                <img
                  src={img.url}
                  className="figure-img img-fluid rounded"
                ></img>
                <figcaption style={{ color: "black" }} class="figure-caption">
                  <b>
                    <i>{img.name}</i>
                  </b>
                </figcaption>
              </figure>
            ))}
            <br />
            <br />
            {rslt["isHold"] === "yes" && (
              <div>
                <h5>
                  if you want to add more images of medical bills. Add here.
                </h5>

                <div className="container">
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <aside>
                    <h4>Accepted files</h4>
                    <ul>{acceptedFileItems}</ul>
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>

                    <Button type="button" onClick={handleupload}>
                      upload
                    </Button>
                  </aside>
                </div>
              </div>
            )}
          </Form>
          <div className="statuss">
            <div className="statusss">
              Status : {rslt["current_auth"]}
              <br />
              Remarks : {rslt["current_auth_remarks"]}
            </div>
            {rslt["isHold"] === "yes" && (
              <>
                <Button onClick={resubmit_application} type="button">
                  Resubmit
                </Button>
                <br />
              </>
            )}
            <br />
            <div id="nav_btn">
              <Button onClick={handlePrint} type="button">
                Print application
              </Button>
              <Button
                onClick={gotoHomePage}
                type="button"
                style={{ marginLeft: "400px" }}
              >
                Return To Home
              </Button>
            </div>
            <br />
            <br />
            <br />
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default ShowApplication;
