import { ErrorMessage, useField } from 'formik';
import React from 'react';
import { Col, Form } from 'react-bootstrap';

const TextField = ({ name, label, md, xs, ...others }) => {
  const [field, meta] = useField({ name });
  return (
    <Col md={md} xs={xs}>
      <Form.Group md="4">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          {...field}
          {...others}
          isInvalid={meta.touched && meta.error}
          isValid={!meta.error && meta.touched}
        />
        <ErrorMessage component="div" className="error" name={name} />
      </Form.Group>
    </Col>
  );
};

export default TextField;
