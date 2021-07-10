import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import HeaderApplicant from "./HeaderComponentApplicant"

import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';

export default class ApplyJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sop: '',
            touched: {
                sop: false,
            },
            jobid: ''
        };
        this.syncInput = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        this.setState({
            jobid: this.props.jobid
        });
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        console.log(this.state.jobid);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            sop: this.state.sop,
            jobid: this.state.jobid
        }
        console.log(UserData);
        axios({
            method: "POST",
            url: "http://localhost:3002/applicant/apply",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            //handle to check that not full already
            alert(response.data.err);
            window.location.replace("http://localhost:3000/applicant/dashboard");

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

    validate = (sop) => {
        const errors = {
            sop: '',
        }
        if (this.state.touched.sop && this.countWords(sop) > 250)
            errors.sop = 'maximum 250 words'
        console.log(errors);
        return errors;
    }

    render() {

        const errors = this.validate(this.state.sop)
        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderApplicant />

                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="sop" md={2} style={{ marginTop: '50px', marginLeft: '10px' }}>SOP :</Label>
                                        <Col md={9}>
                                            <Input type="textarea" id="sop" name="sop"
                                                rows="10"
                                                value={this.state.sop}
                                                valid={errors.sop === ''}
                                                invalid={errors.sop !== ''}
                                                onBlur={this.handleBlur('sop')}
                                                onChange={this.syncInput} />
                                            <FormFeedback>{errors.sop}</FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 5 }}>
                                            <Button color="primary">
                                                Submit
                                </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </div></div></div>
        );
    }
}
