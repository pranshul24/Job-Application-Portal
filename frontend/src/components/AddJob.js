import React, { Component } from 'react';
import TimePicker from 'react-time-picker';
import HeaderRecruiter from "./HeaderComponentRecruiter"

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, FormText, Table, Row
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';
var DatePicker = require("reactstrap-date-picker");



export default class AddJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            max_application: '',
            type: 'Full-time',
            duration: '0',
            salary: '',
            value: '',//for deadline time
            formattedValue: '',//DD/MM/YYYY
            date: '',
            skills: [],
            choseSkills: ['C++', 'C', 'Python', 'Java', 'Ruby', 'Javascript', 'Perl', 'Go'],
            predefskill: 'C',
            customskill: '',
            max_position: ''
        };

        this.syncInput = this.syncInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.AddCustomSkill = this.AddCustomSkill.bind(this);
        this.AddPredefSkill = this.AddPredefSkill.bind(this);
    }

    syncInput(event) {
        var name = event.target.name;
        var value = event.target.value;
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
    AddPredefSkill(event) {
        event.preventDefault();
        if (this.state.choseSkills.length == 0)
            return;
        this.state.skills.push(this.state.predefskill);
        var index = this.state.choseSkills.indexOf(this.state.predefskill);
        if (index > -1) {
            this.state.choseSkills.splice(index, 1);
        }
        this.setState({
            predefskill: this.state.choseSkills[0],
        })
        console.log(this.state.choseSkills);
        console.log(this.state.skills);

    }
    handleSubmit(event) {
        event.preventDefault();
        const UserData = {
            title: this.state.title,
            number_application: this.state.max_application,
            deadlinedate: this.state.formattedValue,
            deadlineorgdate: this.state.date,
            deadlinetime: this.state.value,
            typeofjob: this.state.type,
            duration: this.state.duration,
            salary: this.state.salary,
            skills: this.state.skills,
            number_position: this.state.max_position
        }
        console.log(UserData);
        axios({
            method: "POST",
            url: "http://localhost:3002/recruiter/createjob",
            data: UserData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response)
            window.location.replace("http://localhost:3000/");

        }).catch(err => {
            if (err) {
                console.log(err);
                // this.setState({ isError: true });
                // this.setState({ errors: error.response.data });
                window.location.replace("http://localhost:3000/");

            }
        });
    }

    render() {
        function Renderskills(skills) {
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

        function RenderchoseSkills(list) {
            return (
                list.map((item) => <option>{item}</option>)
            )
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
                                        <Label htmlFor="title" md={3}>Title :</Label>
                                        <Col md={9}>
                                            <Input type="text" id="title" name="title"
                                                placeholder="Title"
                                                value={this.state.title}
                                                onChange={this.syncInput} />
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>
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
                                                value={this.state.max_positions}
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
                                        <Label htmlFor="type" md={3}>Type :</Label>
                                        <Col md={9}>
                                            <Input type="select" id="type" name="type"
                                                value={this.state.type}
                                                onChange={this.syncInput}>
                                                <option>Full-time</option>
                                                <option>Part-time</option>
                                                <option>Work from home</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="salary" md={3}>Salary :</Label>
                                        <Col md={9}>
                                            <Input type="number" min={0} id="salary" name="salary"
                                                placeholder="Salary"
                                                value={this.state.salary}
                                                onChange={this.syncInput} />
                                            <FormFeedback></FormFeedback>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label htmlFor="duration" md={3}>Duration :</Label>
                                        <Col md={9}>
                                            <Input type="select" id="duration" name="duration"
                                                value={this.state.duration}
                                                onChange={this.syncInput}>
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option></Input>
                                            <FormText>in Months</FormText>
                                        </Col>
                                    </FormGroup>
                                    <hr></hr>
                                    <FormGroup row>
                                        <Col className="text-center">
                                            <h6>Add required skills :</h6>
                                        </Col>
                                    </FormGroup>
                                    <div>
                                        <div className="row">
                                            <Col md={{ size: 4, offset: 2 }}>
                                                <Input type="select" id="predefskill" name="predefskill"
                                                    value={this.state.predefskill}
                                                    onChange={this.syncInput}>
                                                    {RenderchoseSkills(this.state.choseSkills)}
                                                </Input>
                                            </Col>

                                            <Col md={{ size: 5 }}>
                                                <Button color="primary" onClick={this.AddPredefSkill}>
                                                    Add Selected Skill
                                            </Button>
                                            </Col>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="row">

                                            <Col md={{ size: 4, offset: 2 }} style={{ marginTop: '10px' }}>
                                                <Input type="text" id="customskill" name="customskill"
                                                    value={this.state.customskill}
                                                    onChange={this.syncInput}></Input>
                                                <FormFeedback></FormFeedback>
                                            </Col>
                                            <Col md={{ size: 5 }} style={{ marginTop: '10px' }}>
                                                <Button color="primary" onClick={this.AddCustomSkill}>
                                                    Add Custom Skill
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
                                    <FormGroup row>
                                        <Col md={{ size: 10, offset: 5 }}>
                                            <Button color="primary">
                                                Register
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card >
                    </div>
                </div>
            </div >
        );
    }
}
