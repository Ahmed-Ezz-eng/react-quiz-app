import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Col } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../redux/reducers/authSlice';

const LoginWithGoogle = () => {
  const dispatch = useDispatch();

  const googleSuccess = (response) => {
    let decode = jwt_decode(response.credential);
    dispatch(
      loginGoogle({
        name: decode.name,
        email: decode.email,
        imageUrl: decode.picture,
        token: response.credential,
      })
    );
  };

  const googleFailed = (error) => {
    alert(`error when login with google ${error}`)
  };

  return (
    <Col className="mt-3 d-grid">
      <GoogleLogin
        onSuccess={googleSuccess}
        onFailure={googleFailed}
        cookiePolicy={'single_host_origin'}
      />
    </Col>
  );
};

export default LoginWithGoogle;
