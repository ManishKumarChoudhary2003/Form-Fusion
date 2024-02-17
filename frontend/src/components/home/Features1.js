import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import feature1 from "../../assets/feature1.jpg";

const Features1 = () => {
  return (
    <Container
      className="mt-15"
      style={{ marginTop: "200px", marginBottom: "50px" }}
    >
      <Row>
        <Col
          md={6}
          style={{
            backgroundImage: `url(${feature1})`,
              // 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwLBo0n8LIYbnILJvvmN4u-qPnO3jkBFNRw&usqp=CAU")',
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
            <h1 style={{ fontSize: "2.5rem" }}>
              Create an online form as easily as creating a document
            </h1>
            <p>
              Select from multiple question types, drag-and-drop to reorder
              questions, and customize values as easily as pasting a list.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Features1;
