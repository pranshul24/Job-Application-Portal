import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {
    Button, Form, FormGroup, FormFeedback, Label, Input, Col, Row, Table, FormText
} from 'reactstrap';
import { Jumbotron, Card, CardBody, CardHeader } from 'reactstrap';

export default class RegisterApplicant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            touched: {
                email: false,
                password: false,
                firstname: false,
                lastname: false
            },
            skills: [],
            choseSkills: ['C++', 'C', 'Python', 'Java', 'Ruby', 'Javascript', 'Perl', 'Go'],
            predefskill: 'C',
            customskill: '',
            education: [],
            edustate: '',
            startyear: '',
            endyear: '',
            firstname: '',
            lastname: '',
        };

        this.syncInput = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.AddCustomSkill = this.AddCustomSkill.bind(this);
        this.AddEducation = this.AddEducation.bind(this);
        this.AddPredefSkill = this.AddPredefSkill.bind(this);

    }

    handleChange(event) {
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
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            type: "Applicant",
            skills: this.state.skills,
            education: this.state.education,
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
    handleBlur = (field) => (evt) => {
        this.setState(
            {
                touched: { ...this.state.touched, [field]: true }
            }
        );
    }
    validate = (password, email, firstname, lastname) => {
        const errors = {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
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
        const Reg =
            RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        if (this.state.touched.email && !Reg.test(email))
            errors.email = 'Invalid Email id'
        console.log(errors);
        return errors;
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
        function Rendereducation(education) {
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
        function RenderchoseSkills(list) {
            return (
                list.map((item) => <option>{item}</option>)
            )
        }
        const errors = this.validate(this.state.password, this.state.email, this.state.firstname, this.state.lastname)
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

                        <div>
                            <hr></hr>
                            <div className="row">
                                <Col>
                                    <h6 className="text-center">Enter Your Skills :</h6>
                                </Col>
                            </div>
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
                        <hr></hr>


                        <div>
                            <div className="row">
                                <Col>
                                    <h6 className="text-center">Enter Your Education :</h6>
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
                                    Register
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}
