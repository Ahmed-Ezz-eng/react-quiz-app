import React from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { Col, Form } from 'react-bootstrap';

const SelectField = ({ name, md, xs, label, options, ...others }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <Col md={md} xs={xs} className="mt-2">
      <Form.Group md="4">
        <Form.Label>{label}</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...field}
          {...others}
          isInvalid={meta.touched && meta.error}
          isValid={!meta.error && meta.touched}
          onChange={handleChange}
        >
          {Object.keys(options).map((item, index) => (
            <option key={index} value={options[item]}>
              {item}
            </option>
          ))}
        </Form.Select>
        <ErrorMessage component="div" className="error" name={name} />
      </Form.Group>
    </Col>
  );
};

export default SelectField;
