import React from 'react';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../redux/reducers/authSlice';

const Header = () => {
  const { questions } = useSelector((state) => state.questionsSlice);
  const { authData } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  return (
    <Navbar bg="primary" variant="dark" className="navbar">
      <Container>
        <Navbar.Brand>{questions[0]?.category} quiz</Navbar.Brand>
        <Nav className="ms-auto">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {authData?.imageUrl ? (
                <img
                  className="profile-img"
                  src={authData?.imageUrl}
                  alt="profile"
                />
              ): (
                <span className="profile-char">{authData?.name?.charAt(0)}</span>
              )}{' '}
              {authData?.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(logOut())}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
