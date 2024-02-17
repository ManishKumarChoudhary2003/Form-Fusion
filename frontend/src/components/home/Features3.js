import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature3 from "../../assets/feature3.jpg"

const Features3 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "200px", marginBottom: "100px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage:
            `url(${feature3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "500px",
          }}  
        >
          {/* Empty column to apply background image */}
        </Col>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>
              Create and respond to surveys from anywhere
            </h2>
            <p>
              Access, create, and edit forms on-the-go, from screens big and
              small. Others can respond to your survey from wherever they
              are—from any mobile device, tablet, or computer.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features3;
