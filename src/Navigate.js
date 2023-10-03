import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import photo from './image/Untitled design-0.jpg'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import zIndex from '@material-ui/core/styles/zIndex';

export default function Navigate() {
    return (
        <>



            <Navbar style={{ zIndex: '1500' }} collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#"><Link to={'/website'} ><img src={photo} height={40} alt="" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <div className="submenu">
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="User" class="bi bi-person-circle" id="collapsible-nav-dropdown">
                                    <Link style={{ color: 'black' }} to={'/profile'}> <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item></Link>
                                    <Link style={{ color: 'black' }} to={'/userlogin'} ><NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item></Link>
                                </NavDropdown>
                                <Nav.Link href="#features" style={{ color: '#fff', fontSize: '28px' }}><Link to={'/addtocart'} style={{ color: 'white' }}><i class="bi bi-cart"></i></Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>




        </>
    )
}
