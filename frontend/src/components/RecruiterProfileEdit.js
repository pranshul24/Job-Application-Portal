import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, Label, Input, Col, Row
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderRecruiter from "./HeaderComponentRecruiter"

export default class EditProfileRecruiter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '', lastname: '', contact: '', bio: '',
            load: false
        };
        this.syncInput = this.syncInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3002/recruiter/profile",
        }).then((response) => {
            console.log(response);
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                contact: response.data.contact,
                bio: response.data.bio,
                email: response.data.email,
                load: true
            });
            console.log(response);
        }).catch(err => {
            if (err) {
                console.log(err);
                // window.location.replace("http://localhost:3000/recruiter/profile");
            }
        });
    }

    syncInput(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state.profile);
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            contact: this.state.contact,
            bio: this.state.bio,
        }
        axios({
            method: "PUT",
            data: data,
            url: "http://localhost:3002/recruiter/profile",
        }).then((response) => {
            console.log(response);
            alert("Successfully Updated")
            window.location.replace("http://localhost:3000/recruiter/profile");
        }).catch(err => {
            if (err) {
                console.log(err);
                window.location.replace("http://localhost:3000/recruiter/profile/edit");
            }
        });

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
                                                value={this.state.firstname} onChange={this.syncInput} />

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="lastname" md={3}>Last Name</Label>
                                        <Col md={9}>
                                            <Input type="text" id="lastname" name="lastname"
                                                placeholder="Last Name"
                                                value={this.state.lastname} onChange={this.syncInput} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="email" md={3}>Email :</Label>
                                        <Col md={9}>
                                            <Input type="text" id="email" name="email"
                                                placeholder="Email"
                                                value={this.state.email} readOnly
                                            ></Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="contact" md={3}>Contact Number :</Label>
                                        <Col md={9}>
                                            <Input type="text" id="contact" name="contact"
                                                placeholder="Contact Number"
                                                value={this.state.contact} onChange={this.syncInput}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="bio" md={3}>Your Bio :</Label>
                                        <Col md={9}>
                                            <Input type="textarea" id="bio" name="bio"
                                                rows="10"
                                                value={this.state.bio} onChange={this.syncInput}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 5 }}>
                                            <Button type="submit" color="primary">
                                                Submit
                                </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card ></div></div></div>
        );
    }
}
