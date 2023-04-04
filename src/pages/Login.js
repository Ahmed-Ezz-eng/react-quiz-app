import { Form, Formik } from 'formik';
import React, { Fragment, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import TextField from '../components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/reducers/authSlice';
import LoginWithGoogle from '../components/LoginWithGoogle';

const Login = () => {
  const { isLoading, isError, authData } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      navigate('/settings');
    }
  }, [authData, navigate]);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    dispatch(signIn(values));
  };

  return (
    <Container>
      <Helmet>
        <title>Login</title>
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
            <h2 className="text-center">Login</h2>
            <Row>
              <TextField name="email" label="Email" type="email" xs={12} />

              <TextField
                name="password"
                label="Password"
                type="password"
                xs={12}
              />

              <div className="d-grid">
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

                {/* LOGIN WITH GOOGLE */}
                <LoginWithGoogle />
              </div>
              <p className="mt-2">
                Don't have an account <Link to="/signup">Register</Link>
              </p>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
