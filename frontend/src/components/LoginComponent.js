import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            touched: {
                email: false,
                password: false
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
            email: this.state.email,
            password: this.state.password
        }
        console.log(UserData);
        axios({
            method: "POST",
            url: "http://localhost:3002/login",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log(res)
            if (res.data.success == true) {
                this.props.setuplogin(res.data.token);
            }
        }).catch(err => {
            if (err) {
                console.log(err);
                // this.setState({ isError: true });
                // this.setState({ errors: error.response.data });
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
    validate = (password, email) => {
        const errors = {
            email: '',
            password: '',
        }
        if (this.state.touched.password && password.length < 6)
            errors.password = 'Password should be atleast 6 characters long'
        // else if (this.state.touched.firstname && firstname.length >= 10)
        //     errors.firstname = 'length should be < 10'

        // const reg = /^[0-9]*$/;
        const Reg =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        // if (this.state.touched.telnum && !reg.test(telnum))
        //     errors.telnum = 'only numbers are allowed'
        if (this.state.touched.email && !Reg.test(email))
            errors.email = 'Invalid Email id'
        console.log(errors);
        return errors;
    }

    render() {
        const errors = this.validate(this.state.password, this.state.email)
        return (

            <div style={{ backgroundColor: '#f5f0e1' }}>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Login Here</h1>
                                <p>Hey ! Good to see you again </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container" style={{ minHeight: '450px', marginTop: '50px' }}>
                    <div className="col-12 col-md-6 offset-md-3">
                        <Card style={{ marginTop: '70px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="email" md={3}>Email :</Label>
                                        <Col md={9}>
                                            <Input type="email" id="email" name="email"
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
                                                Login
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div >
            </div >
        );
    }
}
