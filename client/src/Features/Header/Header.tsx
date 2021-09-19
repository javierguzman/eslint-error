import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LOGO from '@Images/facebook.png';

const Header: React.FC<void> = () => {
  const renderAuthMenu = (): JSX.Element => {
    return (
      <NavDropdown
        title={
          <span>
            <i className="fa fa-user fa-fw" />
            HI
          </span>
        }
        id="basic-nav-dropdowner"
      >
        <NavDropdown.Item as={Link} to="/register" href="/register">
          HI
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/login" href="/login">
          HI
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  return (
    <Navbar className="navbar navbar-expand-lg sticky-top" expand="lg" bg="header" collapseOnSelect>
      <Navbar.Brand as={Link} to="/" href="/">
        <img
          alt="LOGO"
          src={LOGO}
          className="d-inline-block"
          style={{ height: '100%', width: '100%' }}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav ml-auto">
          <Nav.Link as={Link} to="/" href="/" className="header-bigger">
            HI
          </Nav.Link>

          <Nav.Link as={Link} to="/" href="/" className="header-bigger">
            HI
          </Nav.Link>
          {renderAuthMenu()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
