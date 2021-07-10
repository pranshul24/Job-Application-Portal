import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderApplicant from "./HeaderComponentApplicant"

export default class ApplicantRateJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            appid: ''
        };
        this.syncInput = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            appid: this.props.appid
        });
    }

    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        // console.log(this.state.appid);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            rating: this.state.rating,
            appid: this.state.appid
        }
        console.log(UserData);
        axios({
            method: "POST",
            url: "http://localhost:3002/applicant/rate",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            alert(response.data.err);
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
                <HeaderApplicant />

                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="rating" md={3} >Rate Job :</Label>
                                        <Col md={9}>
                                            <Input type="select" id="rating" name="rating" onChange={this.syncInput} value={this.state.rating}
                                            >
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>
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
