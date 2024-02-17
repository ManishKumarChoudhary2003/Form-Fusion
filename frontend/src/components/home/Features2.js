import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature2 from "../../assets/feature2.png";

const Features2 = () => {
  return (
    <Container className="mt-15" style={{ marginTop: "200px", marginBottom: "50px" }}>
      <Row>
        <Col
          md={6}
          className="d-flex align-items-center"
          style={{
            padding: "10px 50px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2.5rem" }}>Analyze responses with automatic summaries</h2>
            <p>
              See charts with response data update in real-time. Or open the raw
              data with Google Sheets for deeper analysis or automation.
            </p>
          </div>
        </Col>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "400px",
            maxWidth: "100%",
          }}
        ></Col>
      </Row>
    </Container>
  );
};

export default Features2;
