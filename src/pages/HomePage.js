import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Navbar';
import Quiz from '../components/Quiz';
import { Helmet } from 'react-helmet';
import decode from 'jwt-decode';
import { logOut } from '../redux/reducers/authSlice';

const HomePage = () => {
  const { authData } = useSelector((state) => state.authSlice);
  const { questions } = useSelector((state) => state.questionsSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData || questions.length < 1) {
      navigate('/signup');
    }
  }, [navigate, authData, questions.length]);

  useEffect(() => {
    if (authData?.token) {
      const decodedToken = decode(authData?.token);
      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        dispatch(logOut());
      }
    }
  }, [authData?.token, dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Quiz page</title>
      </Helmet>
      <Header />
      <Quiz />
    </Fragment>
  );
};

export default HomePage;
