import React, { useState } from 'react';
import ListGateways from './Gateway/ListGateways';
import ListPeripherals from './Peripherals/ListPeripherals';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col
} from 'reactstrap';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar color="light" light expand="md">
            <NavbarBrand>Gateway Admin System</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">Gateways</Link>
                </NavItem>
                <NavItem>
                  <Link to="/peripherals" className="nav-link">Peripherals</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>
        <section className="content">
          <Container>
            <Row>
              <Col>
                <Switch>
                  <Route exact path="/">
                    <ListGateways />
                  </Route>
                  <Route path="/peripherals">
                    <ListPeripherals />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Router>
  );
}

export default App;
