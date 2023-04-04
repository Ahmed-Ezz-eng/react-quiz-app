import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../redux/reducers/authSlice';
import FileBase64 from 'react-file-base64';

const Register = () => {
  const { isError, isLoading, authData } = useSelector(
    (state) => state.authSlice
  );
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      navigate('/settings');
    }
  }, [navigate, authData]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must be match')
      .required('Required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    let formData = {
      ...values,
      imageUrl,
    };
    dispatch(signUp(formData));
  };

  return (
    <Container>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {isError && <Alert variant={'danger'}>{isError}</Alert>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {(formik) => (
          <Form className="register-form">
            <h2 className="text-center">Register</h2>
            <Row>
              <TextField
                name="firstName"
                label="FirstName"
                type="text"
                md={6}
                xs={12}
              />

              <TextField
                name="lastName"
                label="LastName"
                type="text"
                md={6}
                xs={12}
              />

              <TextField name="email" label="Email" type="email" xs={12} />

              <TextField
                name="password"
                label="Password"
                type="password"
                xs={12}
              />

              <TextField
                name="confirmPassword"
                label="Confirm password"
                type="password"
                xs={12}
              />

              <div className="mt-3">
                <FileBase64 onDone={({ base64 }) => setImageUrl(base64)} />
              </div>

              <Col className="mt-3 d-grid">
                {' '}
                <Button
                  variant="success"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {isLoading ? (
                    <Fragment>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Loading...
                    </Fragment>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Col>
              <p className="mt-2">
                already have an account <Link to="/signin">Login</Link>
              </p>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
