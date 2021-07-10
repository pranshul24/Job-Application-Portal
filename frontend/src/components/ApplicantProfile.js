import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
import HeaderApplicant from "./HeaderComponentApplicant"

export default class ProfileApplicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: '', load: false, profileimagefile: '', resume: '',
            profiletext: '', resumetext: ''
        };
        this.syncProfileImage = this.syncProfileImage.bind(this);
        this.syncResume = this.syncResume.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadResume = this.uploadResume.bind(this);
        this.uploadProfileImage = this.uploadProfileImage.bind(this);
    }
    uploadResume(event) {
        if (this.state.resume == '') {
            return alert("choose resume");
        }
        const formData = new FormData();
        formData.append('resume', this.state.resume);
        formData.append('userid', this.state.profile.userid);
        axios({
            method: "POST",
            url: "http://localhost:3002/applicant/resume/upload",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            alert("resume uploaded");
            this.setState({
                resume: '',
                resumetext: ''
            });
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
    }
    uploadProfileImage(event) {
        if (this.state.profileimagefile == '') {
            return alert("choose profile image");
        }
        const formData = new FormData();
        formData.append('profileimage', this.state.profileimagefile);
        formData.append('userid', this.state.profile.userid);
        axios({
            method: "POST",
            url: "http://localhost:3002/applicant/profile/upload",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            console.log(response);
            alert("profile image uploaded");
            this.setState({
                profileimagefile: '',
                profiletext: ''
            });
        }).catch(err => {
            if (err) {
                console.log(err);
            }
        });
    }
    syncProfileImage(event) {
        var value = event.target.value;
        this.setState({
            profileimagefile: event.target.files[0],
            profiletext: value.split("\\").pop()

        });
    }
    syncResume(event) {
        var value = event.target.value;
        this.setState({
            resume: event.target.files[0],
            resumetext: value.split("\\").pop()
        });
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3002/applicant/profile",
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
        window.location.replace("http://localhost:3000/applicant/profile/edit");

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
        if (this.state.load == '') {
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
                                                value={this.state.profile.email} readOnly></Input>
                                        </Col>

                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="profileimage" md={3}>Profile Image :</Label>
                                        <Col md={7}>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="profileimage" name="profileimage"
                                                    accept=".png, .jpg, .jpeg,.gif,.svg"
                                                    onChange={this.syncProfileImage} ></input>
                                                <label class="custom-file-label" for="profileimage">{this.state.profiletext}</label>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <Button color="danger" onClick={this.uploadProfileImage}>Upload</Button>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="resume" md={3}>Resume :</Label>
                                        <Col md={7}>
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input" id="resume" name="resume"
                                                    accept=".pdf"
                                                    onChange={this.syncResume} ></input>
                                                <label class="custom-file-label" for="resume">{this.state.resumetext}</label>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <Button color="danger" onClick={this.uploadResume}>Upload</Button>
                                        </Col>
                                    </FormGroup>
                                    <div>
                                        <hr></hr>
                                        <div className="row">
                                            <Col>
                                                <h6 className="text-center">Your Skills :</h6>
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
                                                    {Renderskills(this.state.profile.skills)}
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
                                                    {Rendereducation(this.state.profile.education)}
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
