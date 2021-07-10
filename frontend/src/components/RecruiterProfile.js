import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, Label, Input, Col, Row
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderRecruiter from "./HeaderComponentRecruiter"

export default class ProfileRecruiter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: '',
            load: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3002/recruiter/profile",
        }).then((response) => {
            console.log(response);
            this.setState({
                profile: response.data,
                load: true
            });
            console.log(response);
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        window.location.replace("http://localhost:3000/recruiter/profile/edit");

    }
    render() {
        if (this.state.load == '') {
            return <h1>Loading...</h1>
        }
        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderRecruiter />
                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="firstname" md={3}>First Name</Label>
                                        <Col md={9}>
                                            <Input type="text" id="firstname" name="firstname"
                                                value={this.state.profile.firstname} readOnly />

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="lastname" md={3}>Last Name</Label>
                                        <Col md={9}>
                                            <Input type="text" id="lastname" name="lastname"
                                                placeholder="Last Name"
                                                value={this.state.profile.lastname} readOnly />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="email" md={3}>Email :</Label>
                                        <Col md={9}>
                                            <Input type="text" id="email" name="email"
                                                placeholder="Email"
                                                value={this.state.profile.email} readOnly
                                            ></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="contact" md={3}>Contact Number :</Label>
                                        <Col md={9}>
                                            <Input type="text" id="contact" name="contact"
                                                placeholder="Contact Number"
                                                value={this.state.profile.contact} readOnly
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="bio" md={3}>Your Bio :</Label>
                                        <Col md={9}>
                                            <Input type="textarea" id="bio" name="bio"
                                                rows="10"
                                                value={this.state.profile.bio} readOnly
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 5 }}>
                                            <Button type="submit" color="primary">
                                                Edit
                                </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card ></div></div></div>
        );
    }
}
