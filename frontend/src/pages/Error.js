import React from 'react';
import { Container } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <div>
        <h1 className="text-center mb-4">Error</h1>
        <p className="text-center">Oops! Something went wrong.</p>
      </div>
    </Container>
  );
};

export default ErrorPage;
