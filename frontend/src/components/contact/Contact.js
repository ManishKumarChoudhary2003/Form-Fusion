import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import avatar from "../../assets/avatar.jpeg";
// import Manish from "../../assets/Manish.png"
import Navbar from "../home/Navbar/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Container className="py-4 rounded p-5" style={{backgroundColor : "#f9fdff"}}>
       
        <Row>
          <Col lg={6} className="py-4">
            <Image
              src={avatar}
              alt="Avatar"
              width="300px"
              className="img-fluid rounded-circle ml-5 mt-5 mb-5"
            />
          </Col>
          <Col lg={6} className="py-4 mt-5">
          <div>
          <p style={{color : "#1c4bab", fontSize : "1.2rem"}}>
            Form Fusion: Seamlessly merge user responses with dynamic forms for
            streamlined data collection and analysis. Simplify feedback
            processes.
          </p>
        </div>
            <h2 className="mb-4">Contact Info</h2>
            <p className="mb-1">+91 8955946276</p>
            <p className="mb-1">
              <a
                className="text-info"
                href="mailto:cmanishkumar193@gmail.com"
                style={{ textDecoration: "none" }}
              >
                cmanishkumar193@gmail.com
              </a>
            </p>
            <p className="mb-1">Jodhpur, India-342802</p>
            <p>
              Visit my{" "}
              <a
                href="https://manish-kumar-choudhary.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#560ad1" }}
              >
                portfolio
              </a>{" "}
              for more information.
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/manishkumarchoudhary/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Linkedln
              </a>{" "}
              <a
                className="ml-2"
                href="https://github.com/Manishkumarchoudhary2003"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Github
              </a>{" "}
              <a
                className="ml-2"
                href="https://www.instagram.com/manish_.96/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#0a85d1" }}
              >
                Instagram
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
