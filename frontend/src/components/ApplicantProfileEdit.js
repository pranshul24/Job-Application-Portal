import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderApplicant from "./HeaderComponentApplicant"

export default class EditProfileApplicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '', lastname: '', skills: '', education: '', email: '', customskill: '', edustate: '', endyear: '', startyear: ''
            , load: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.syncInput = this.syncInput.bind(this);
        this.AddCustomSkill = this.AddCustomSkill.bind(this);
        this.AddEducation = this.AddEducation.bind(this);

    }


    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3002/applicant/profile",
        }).then((response) => {
            console.log(response);
            this.setState({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                skills: response.data.skills,
                education: response.data.education,
                email: response.data.email,
                load: true
            });
            console.log(response);
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
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
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            skills: this.state.skills,
            education: this.state.education,
        }
        axios({
            method: "PUT",
            data: data,
            url: "http://localhost:3002/applicant/profile",
        }).then((response) => {
            console.log(response);
            window.location.replace("http://localhost:3000/applicant/profile");
        }).catch(err => {
            if (err) {
                console.log(err);
                window.location.replace("http://localhost:3000/applicant/profile");
            }
        });
    }
    AddEducation(event) {
        event.preventDefault();
        var curyear = new Date().getFullYear();
        if (this.state.edustate == "" || this.state.startyear == "" || this.state.startyear < 1980 || this.state.startyear > curyear || this.state.endyear < 1980 || this.state.endyear < this.state.startyear)
            return;
        const EducationData = {
            education: this.state.edustate,
            startyear: this.state.startyear,
            endyear: this.state.endyear
        }
        this.state.education.push(EducationData);
        this.setState({
            edustate: '',
            startyear: '',
            endyear: ''
        })

    }
    AddCustomSkill(event) {
        event.preventDefault();
        if (this.state.customskill == "")
            return;
        this.state.skills.push(this.state.customskill);
        this.setState({
            customskill: '',
        })
        console.log(this.state.skills);
    }
    render() {
        function Renderskills(skills) {
            if (!skills) {
                return (
                    <tbody>
                    </tbody>
                );
            }
            return (
                <tbody>
                    {skills.map((skill) => {
                        return (<tr className="text-center">
                            <td>{skill}</td>
                        </tr>)
                    })}
                </tbody>
            );
        }
        function Rendereducation(education) {
            if (!education) {
                return (
                    <tbody>

                    </tbody>
                );
            }
            return (
                <tbody>
                    {education.map((edu) => {
                        return (<tr className="text-center">
                            <td>{edu.education}</td>
                            <td>{edu.startyear}</td>
                            <td>{edu.endyear}</td>

                        </tr>)
                    })}
                </tbody>
            );
        }
        if (this.state.load == false) {
            return <h1>Loading...</h1>
        }
        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderApplicant />

                <div className="container" style={{ minHeight: '1250px', marginTop: '50px' }}>
                    <div className="col-12 col-md-8 offset-md-2">
                        <Card style={{ marginTop: '70px', marginBottom: '50px' }}>
                            <CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup row>
                                        <Label htmlFor="firstname" md={3}>First Name</Label>
                                        <Col md={9}>
                                            <Input type="text" id="firstname" name="firstname"
                                                placeholder="First Name"
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
                                                value={this.state.email} readOnly></Input>
                                        </Col>
                                    </FormGroup>
                                    <div>
                                        <hr></hr>
                                        <div className="row">
                                            <Col>
                                                <h6 className="text-center">Your Skills :</h6>
                                            </Col>
                                        </div>
                                        <div className="row">
                                            <Col md={{ size: 4, offset: 2 }} style={{ marginTop: '10px' }}>
                                                <Input type="text" id="customskill" name="customskill"
                                                    value={this.state.customskill}
                                                    onChange={this.syncInput}></Input>
                                            </Col>
                                            <Col md={{ size: 5 }} style={{ marginTop: '10px' }}>
                                                <Button color="primary" onClick={this.AddCustomSkill}>
                                                    Add New Skill
                                                </Button>
                                            </Col>
                                        </div>
                                    </div>

                                    <hr></hr>
                                    <div className="container">
                                        <Row>
                                            <Col md={{ size: 4, offset: 4 }}>
                                                <Table responsive striped dark>
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Skill</th>
                                                        </tr>
                                                    </thead>
                                                    {Renderskills(this.state.skills)}
                                                </Table>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr></hr>


                                    <div>
                                        <div className="row">
                                            <Col>
                                                <h6 className="text-center">Your Education :</h6>
                                            </Col>
                                        </div>
                                        <div className="row">
                                            <Label htmlFor="edustate" md={{ size: 3, offset: 3 }} style={{ marginTop: '10px' }}>Education :</Label>
                                            <Col md={{ size: 4 }} style={{ marginTop: '10px' }}>
                                                <Input type="text" id="edustate" name="edustate"
                                                    value={this.state.edustate}
                                                    onChange={this.syncInput}></Input>
                                                <FormFeedback></FormFeedback>
                                            </Col>
                                        </div>
                                        <div className="row">
                                            <Label htmlFor="startyear" md={{ size: 3, offset: 3 }} style={{ marginTop: '10px' }}>Startyear :</Label>
                                            <Col md={{ size: 4 }} style={{ marginTop: '10px' }}>
                                                <Input type="number" id="startyear" name="startyear" min={1980} max={2021}
                                                    value={this.state.startyear}
                                                    onChange={this.syncInput}></Input>
                                                <FormFeedback></FormFeedback>
                                                <FormText>min : 1980 , max : 2021</FormText>
                                            </Col></div><div className="row">
                                            <Label htmlFor="endyear" md={{ size: 3, offset: 3 }} style={{ marginTop: '10px' }}>Endyear :</Label>
                                            <Col md={{ size: 4 }} style={{ marginTop: '10px' }} >
                                                <Input type="number" id="endyear" name="endyear" min={1980}
                                                    value={this.state.endyear}
                                                    onChange={this.syncInput}></Input>
                                                <FormText>min : 1980</FormText>
                                            </Col></div>
                                        <div className="row">
                                            <Col md={{ size: 5, offset: 5 }} style={{ marginTop: '10px' }}>
                                                <Button color="primary" onClick={this.AddEducation}>
                                                    Add Education
                                    </Button>
                                            </Col>
                                        </div>
                                    </div>

                                    <hr></hr>
                                    <div className="container">
                                        <Row>
                                            <Col md={{ size: 8, offset: 2 }}>
                                                <Table responsive striped dark>
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Education</th>
                                                            <th>Start year</th>
                                                            <th>End year</th>
                                                        </tr>
                                                    </thead>
                                                    {Rendereducation(this.state.education)}
                                                </Table>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr></hr>
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 5 }}>
                                            <Button color="primary">
                                                Edit
                                </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card></div></div></div>
        );
    }
}
