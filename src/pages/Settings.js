import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import SelectField from '../components/SelectField';
import { getQuestions } from '../redux/reducers/questionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { isLoading, isError } = useSelector((state) => state.questionsSlice);
  const { authData } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate('/signup');
    }
  }, [navigate, authData]);

  const validationSchema = Yup.object({
    number: Yup.number()
      .min(3, 'number of questions are 3 at least')
      .max(20, 'number of questions are 20 at most')
      .required('Number of questions is required'),
    time: Yup.number()
      .min(30, '30 second at least')
      .max(300, '300  second at most')
      .required('Time of questions is required'),
    category: Yup.string().required('category is required'),
    difficulty: Yup.string().required('difficulty is required'),
  });

  const initialValues = {
    number: '',
    category: '9',
    difficulty: 'easy',
    time: '',
  };

  const category = {
    knowledge: 9,
    history: 23,
    sports: 21,
    art: 25,
    animals: 27,
    computers: 18,
    maths: 19,
  };

  const difficult = {
    easy: 'easy',
    medium: 'medium',
    hard: 'hard',
  };

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    dispatch(getQuestions(values)).then(() => {
      localStorage.setItem('time', JSON.stringify(values.time));
      navigate('/');
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Quiz Settings</title>
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
            <h2 className="text-center">Quiz settings</h2>
            <Row>
              <TextField
                name="number"
                label="Number of questions"
                type="number"
                md={6}
                xs={12}
              />

              <TextField
                name="time"
                label="Time in seconds"
                type="number"
                md={6}
                xs={12}
              />

              <SelectField
                value={formik.values.category}
                name="category"
                label="Categories"
                options={category}
                xs={12}
              />

              <SelectField
                value={formik.values.difficulty}
                name="difficulty"
                label="Difficulty"
                options={difficult}
                xs={12}
              />

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
                    'Start the quiz'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Settings;
