import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import HeaderRecruiter from "./HeaderComponentRecruiter"

import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import TimePicker from 'react-time-picker';
var DatePicker = require("reactstrap-date-picker");


export default class JobEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',//for deadline time
            formattedValue: '',//DD/MM/YYYY
            date: '',
            jobid: '',
            max_application: '',
            max_position: ''

        };
        this.syncInput = this.syncInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            jobid: this.props.jobid
        });
        const data = {
            jobid: this.props.jobid
        }
        console.log("hi" + data.jobid);
        axios({
            method: "POST",
            url: "http://localhost:3002/recruiter/job",
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            this.setState({
                max_position: response.data.number_position,
                max_application: response.data.number_application,
                date: response.data.deadlineorgdate,
                time: response.deadlinetime,
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
        // console.log(this.state.jobid);
        this.setState({
            [name]: value
        });
    }
    handleChange(value) {
        this.setState({
            value: value,
        })
    }
    handleDateChange(value, formattedValue) {
        this.setState({
            date: value,
            formattedValue: formattedValue
        })
        console.log(formattedValue);

    }
    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            jobid: this.state.jobid,
            number_application: this.state.max_application,
            number_position: this.state.max_position,
            deadlineorgdate: this.state.date,
            deadlinedate: this.state.formattedValue,
            deadlinetime: this.state.value,
        }
        console.log(UserData);
        axios({
            method: "PUT",
            url: "http://localhost:3002/recruiter/job",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            alert("Done !");
            window.location.replace("http://localhost:3000/applicant/dashboard");

        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
    }


    render() {

        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderRecruiter />
                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="max_application" md={3}>Max Applications :</Label>
                                        <Col md={9}>
                                            <Input type="number" min={0} id="max_application" name="max_application"
                                                placeholder="Max Applications"
                                                value={this.state.max_application}
                                                onChange={this.syncInput} />
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="max_position" md={3}>Max Positions :</Label>
                                        <Col md={9}>
                                            <Input type="number" min={0} id="max_position" name="max_position"
                                                placeholder="Max Positions"
                                                value={this.state.max_position}
                                                onChange={this.syncInput} />
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="time" md={3}>Deadline time :</Label>
                                        <Col md={9}>
                                            <TimePicker
                                                onChange={(value) => this.handleChange(value)}
                                                value={this.state.value}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="date" md={3}>Deadline date :</Label>
                                        <Col md={9}>
                                            <DatePicker id="date"
                                                dateFormat="DD/MM/YYYY"
                                                minDate={new Date().toISOString()}
                                                value={this.state.date}
                                                onChange={(v, f) => this.handleDateChange(v, f)} />
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
