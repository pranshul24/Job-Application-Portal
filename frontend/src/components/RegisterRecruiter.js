import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';

export default class RegisterRecruiter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            bio: '',
            contact: '',
            firstname: '',
            lastname: '',
            touched: {
                email: false,
                password: false,
                bio: false,
                contact: false,
                firstname: false,
                lastname: false
            },
        };

        this.syncInput = this.syncInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

    }

    syncInput(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            type: "Recruiter",
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact,
            bio: this.state.bio,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        console.log(UserData);
        axios({
            method: "POST",
            url: "http://localhost:3002/register",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response)
            alert("Hey, you have been registered successfully !");
            window.location.replace("http://localhost:3000/login");

        }).catch(err => {
            if (err) {
                console.log(err);

            }
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState(
            {
                touched: { ...this.state.touched, [field]: true }
            }
        );
    }
    countWords = (str1) => {
        str1 = str1.replace(/(^\s*)|(\s*$)/gi, "");
        str1 = str1.replace(/[ ]{2,}/gi, " ");
        str1 = str1.replace(/\n /, "\n");
        return str1.split(' ').length;
    }
    validate = (password, email, bio, contact, firstname, lastname) => {
        const errors = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            bio: '',
            contact: ''
        }
        if (this.state.touched.password && password.length < 6)
            errors.password = 'Password should be atleast 6 characters long'
        const reg1 = /^[A-Za-z]+$/;
        if (this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First name should have atleast 3 alphabets'
        else if (this.state.touched.firstname && !reg1.test(firstname))
            errors.firstname = 'First name can only contain alphabets'
        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last name should have atleast 3 alphabets'
        else if (this.state.touched.lastname && !reg1.test(lastname))
            errors.lastname = 'Last name can only contain alphabets'
        const reg = /^[0-9]*$/;
        const Reg =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (this.state.touched.contact && contact.length == 0)
            errors.contact = 'enter contact number'
        else if (this.state.touched.contact && !reg.test(contact))
            errors.contact = 'only numbers are allowed'
        if (this.state.touched.email && !Reg.test(email))
            errors.email = 'Invalid Email id'
        if (this.state.touched.bio && this.countWords(bio) > 250)
            errors.bio = 'maximum 250 words'
        console.log(errors);
        return errors;
    }

    render() {
        const errors = this.validate(this.state.password, this.state.email, this.state.bio, this.state.contact, this.state.firstname, this.state.lastname)
        return (
            <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={3}>First Name</Label>
                            <Col md={9}>
                                <Input type="text" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    value={this.state.firstname}
                                    valid={errors.firstname === ''}
                                    invalid={errors.firstname !== ''}
                                    onBlur={this.handleBlur('firstname')}
                                    onChange={this.syncInput} />
                                <FormFeedback>{errors.firstname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={3}>Last Name</Label>
                            <Col md={9}>
                                <Input type="text" id="lastname" name="lastname"
                                    placeholder="Last Name"
                                    value={this.state.lastname}
                                    valid={errors.lastname === ''}
                                    invalid={errors.lastname !== ''}
                                    onBlur={this.handleBlur('lastname')}
                                    onChange={this.syncInput} />
                                <FormFeedback>{errors.lastname}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={3}>Email :</Label>
                            <Col md={9}>
                                <Input type="text" id="email" name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')}
                                    onChange={this.syncInput}></Input>
                                <FormFeedback>{errors.email}</FormFeedback>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="contact" md={3}>Contact Number :</Label>
                            <Col md={9}>
                                <Input type="text" id="contact" name="contact"
                                    placeholder="Contact Number"
                                    value={this.state.contact}
                                    valid={errors.contact === ''}
                                    invalid={errors.contact !== ''}
                                    onBlur={this.handleBlur('contact')}
                                    onChange={this.syncInput} />
                                <FormFeedback>{errors.contact}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="bio" md={3}>Your Bio :</Label>
                            <Col md={9}>
                                <Input type="textarea" id="bio" name="bio"
                                    rows="10"
                                    value={this.state.bio}
                                    valid={errors.bio === ''}
                                    invalid={errors.bio !== ''}
                                    onBlur={this.handleBlur('bio')}
                                    onChange={this.syncInput} />
                                <FormFeedback>{errors.bio}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="password" md={3}>Password :</Label>
                            <Col md={9}>
                                <Input type="password" id="password" name="password"
                                    value={this.state.password}
                                    valid={errors.password === ''}
                                    invalid={errors.password !== ''}
                                    onBlur={this.handleBlur('password')}
                                    onChange={this.syncInput}></Input>
                                <FormFeedback>{errors.password}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 5 }}>
                                <Button type="submit" color="primary">
                                    Register
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card >
        );
    }
}
