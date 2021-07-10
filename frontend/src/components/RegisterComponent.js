import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import RegisterRecruiter from './RegisterRecruiter'
import RegisterApplicant from './RegisterApplicant'


export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'Applicant',
            touched: {
                email: false,
                password: false
            },
        };

        this.syncInput = this.syncInput.bind(this);
        this.OtherRegisterDetails = <RegisterApplicant />
    }

    syncInput(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(value);

    }

    render() {

        if (this.state.type.localeCompare("Applicant") == 0) {
            this.OtherRegisterDetails = <RegisterApplicant />;
        }
        else {
            this.OtherRegisterDetails = <RegisterRecruiter />;
        }

        return (

            <div style={{ backgroundColor: '#f5f0e1' }}>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Register Here</h1>
                                <p>Hey ! You came late but as we know better late than never </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form>
                                    <FormGroup row>
                                        <Label htmlFor="type" md={3}>Type :</Label>
                                        <Col md={9}>
                                            <Input type="select" name="type"
                                                value={this.state.type}
                                                onChange={this.syncInput}>
                                                <option>Applicant</option>
                                                <option>Recruiter</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                {this.OtherRegisterDetails}
                            </CardBody>
                        </Card>
                    </div>
                </div >
            </div >
        );
    }
}
