import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderRecruiter from "./HeaderComponentRecruiter"

export default class JobDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobid: ''
        };
        this.syncInput = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            jobid: this.props.jobid
        });
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(this.state.jobid);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            jobid: this.state.jobid
        }
        console.log(UserData);
        axios({
            method: "DELETE",
            url: "http://localhost:3002/recruiter/job",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);

            alert("Job deleted successfully !");
            window.location.replace("http://localhost:3000/recruiter/dashboard");

        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
    }

    handleBack(event) {
        window.location.replace("http://localhost:3000/recruiter/dashboard");
    }

    render() {

        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderRecruiter />
                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Row className="justify-content-center"><h6>Are you sure you want to delete the job ?</h6></Row>
                                <Row>
                                    <div className="col-6 offset-3">
                                        <button className="btn btn-outline-primary btn-block" onClick={this.handleSubmit}>Yes</button>
                                        <button className="btn btn-outline-danger btn-block" onClick={this.handleBack}>No</button>
                                    </div>
                                </Row>
                            </CardBody>
                        </Card>
                    </div></div></div>
        );
    }
}
