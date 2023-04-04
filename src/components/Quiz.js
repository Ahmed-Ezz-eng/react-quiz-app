import React, { Fragment, useState } from 'react';
import Money from './Money';
import Questions from './Questions';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Quiz = () => {
  const [qNumber, setQNumber] = useState(0);
  const { isLoading, isError } = useSelector((state) => state.questionsSlice);

  return (
    <Container className="quiz-container" fluid>
      <Row>
        {isError ? (
          <Alert variant="danger">{isError}</Alert>
        ) : isLoading ? (
          <Spinner animation="border" variant="info" />
        ) : (
          <Fragment>
            <Col xs={12} md={10}>
              <Questions qNumber={qNumber} setQNumber={setQNumber} />
            </Col>
            <Col xs={12} md={2}>
              <Money qNumber={qNumber} />
            </Col>
          </Fragment>
        )}
      </Row>
    </Container>
  );
};

export default Quiz;
