import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class HeaderRecruiter extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">Job Portal</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/recruiter/profile'><span className="fa fa-user fa-lg"></span> My Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/recruiter/add'><span className="fa fa-plus fa-lg"></span> Add Job</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/recruiter/dashboard'><span className="fa fa-list fa-lg"></span> Jobs Offered</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/recruiter/employees'><span className="fa fa-address-card fa-lg"></span> Employees</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link btn btn-dark" to='/logout'><span className="fa fa-user fa-lg"></span> Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Recruiter</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default HeaderRecruiter;