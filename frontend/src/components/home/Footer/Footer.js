import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-4 bg-light rounded">
      <Container>
        <Row>
          <Col lg={6} style={{ padding: "50px" }}>
            <div className="mb-4">
              <h2>Thanks for visiting</h2>
              <p>
                Thank you for visiting Form Fusion. Connect with us over
                socials.
              </p>
            </div>
          </Col>
          <Col lg={6} style={{ padding: "50px" }}>
            <div>
              <h2>Contact Info</h2>
              <p style={{ marginBottom: "5px" }}>+91 8955946276</p>
              <p style={{ marginBottom: "5px" }}>
                <a
                    className="text-info"
                  href="mailto:cmanishkumar193@gmail.com"
                  style={{ textDecoration: "none" }}
                >
                  cmanishkumar193@gmail.com
                </a>
              </p>
              <p style={{ marginBottom: "5px" }}>Jodhpur, India-342802</p>
              <p>
                Visit my{" "}
                <a
                  href="https://manish-kumar-choudhary.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success"
                  style={{ textDecoration: "none" }}
                >
                  portfolio
                </a>{" "}
                for more information.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-3">
        <p>© {new Date().getFullYear()} Form Fusion. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
