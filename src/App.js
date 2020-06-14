import React, { useState } from 'react';
import ListGateways from './pages/Gateways/ListGateways';
import ShowGateway from './pages/Gateways/ShowGateway';
import AddGateway from './pages/Gateways/AddGateway';
import ListPeripherals from './pages/Peripherals/ListPeripherals';

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
  Container
} from 'reactstrap';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div className="App">
        <header className="bg-light">
          <Container>
            <Navbar color="light" light expand="md">
              <NavbarBrand>Gateway Admin System</NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link to="/" className="nav-link">Gateways</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/peripherals" className="nav-link">Peripherals</Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Container>
        </header>
        <section className="content">
          <Container>
            <Switch>
              <Route exact path="/">
                <ListGateways />
              </Route>
              <Route path="/peripherals">
                <ListPeripherals />
              </Route>
              <Route path="/gateway/:id">
                <ShowGateway />
              </Route>
              <Route path="/add/gateway">
                <AddGateway />
              </Route>
            </Switch>
          </Container>
        </section>
      </div>
    </Router>
  );
}

export default App;
