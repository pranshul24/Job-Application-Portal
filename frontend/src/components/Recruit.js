import React, { Component } from 'react';
import HeaderRecruiter from "./HeaderComponentRecruiter"

// reactstrap components
import { UncontrolledPopover, PopoverHeader, PopoverBody, Button, Table, Row, Input, FormText, FormFeedback, UncontrolledCollapse, Card, CardBody } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FuzzySearch from 'fuzzy-search';
class Recruit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            load: false,
            actual: '',
            jobid: '',
            sortname: false,
            sortdateofapplication: false,
            sortrating: false,
            sortnametype: "",
            sortdateofapplicationtype: "",
            sortdateofapplicationicon: 'fa fa-sort',
            sortratingtype: "",
            sortnameicon: 'fa fa-sort',
            sortratingicon: 'fa fa-sort',
            display: ''
        };
        this.handlesortdateofapplication = this.handlesortdateofapplication.bind(this);
        this.handlesortname = this.handlesortname.bind(this);
        this.handlesortrating = this.handlesortrating.bind(this);

    }


    handlesortdateofapplication() {
        if (this.state.sortdateofapplication) {
            if (this.state.sortdateofapplicationtype.localeCompare("asc") == 0) {
                this.setState({
                    sortdateofapplicationtype: "desc",
                    sortdateofapplicationicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    var da = new Date(a.dateofapplication),
                        db = new Date(b.dateofapplication);
                    return db - da;
                });
            }
            else {
                this.setState({
                    sortdateofapplicationtype: "asc",
                    sortdateofapplicationicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    var da = new Date(a.dateofapplication),
                        db = new Date(b.dateofapplication);
                    return da - db;
                });
            }
        }
        else {
            this.setState({
                sortdateofapplication: "true",
                sortdateofapplicationtype: "asc",
                sortdateofapplicationicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                var da = new Date(a.dateofapplication),
                    db = new Date(b.dateofapplication);
                return da - db;
            });
        }
        this.setState({
            sortrating: false,
            sortratingicon: "fa fa-sort"
        });
        this.setState({
            sortname: false,
            sortnameicon: "fa fa-sort"
        });
    }
    handlesortrating() {
        if (this.state.sortrating) {
            if (this.state.sortratingtype.localeCompare("asc") == 0) {
                this.setState({
                    sortratingtype: "desc",
                    sortratingicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    return b.rating - a.rating;
                });
            }
            else {
                this.setState({
                    sortratingtype: "asc",
                    sortratingicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    return a.rating - b.rating;
                });
            }
        }
        else {
            this.setState({
                sortrating: "true",
                sortratingtype: "asc",
                sortratingicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                return a.rating - b.rating;
            });
        }
        this.setState({
            sortdateofapplication: false,
            sortdateofapplicationicon: "fa fa-sort"
        });
        this.setState({
            sortname: false,
            sortnameicon: "fa fa-sort"
        });
    }
    handlesortname() {
        if (this.state.sortname) {
            if (this.state.sortnametype.localeCompare("asc") == 0) {
                this.setState({
                    sortnametype: "desc",
                    sortnameicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    var fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return 1;
                    }
                    if (fa > fb) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                this.setState({
                    sortnametype: "asc",
                    sortnameicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    var fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();

                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
        else {
            this.setState({
                sortname: "true",
                sortnametype: "asc",
                sortnameicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                var fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        this.setState({
            sortrating: false,
            sortratingicon: "fa fa-sort"
        });
        this.setState({
            sortdateofapplication: false,
            sortdateofapplicationicon: "fa fa-sort"
        });

    }

    componentDidMount() {
        this.setState({
            jobid: this.props.jobid
        });
        const data = {
            jobid: this.props.jobid
        }
        axios({
            method: "POST",
            url: "http://localhost:3002/recruiter/recruit",
            data: data
        }).then((response) => {
            console.log(response);
            this.setState({
                profile: response.data,
                actual: response.data,
                load: true
            });
            console.log(response);
        }).catch(err => {
            if (err) {
                console.log(err);
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
        function Renderapplications(applications) {
            if (!applications) {
                return (
                    <tbody>
                    </tbody>
                );
            }
            return (
                <tbody>
                    {applications.map((application) => {
                        var display, color;
                        if (application.stage.localeCompare("Applied") == 0) { display = "Shortlist"; color = "btn btn-primary" }
                        else {
                            display = "Accept"; color = "btn btn-success"
                        }
                        return (<tr className="text-center" key={"q" + application._id}>
                            <td>{application.name}</td>
                            <td>{new Date(application.date).toDateString()}</td>
                            <td>{application.rating}</td>
                            <td>{application.stage}</td>
                            <td><Button color="dark" id={"p" + application._id}>
                                Education
                            </Button></td>
                            <td><Button color="dark" id={"s" + application._id}>
                                Skills
                            </Button></td>
                            <td><Button color="dark" id={"d" + application._id}>
                                SOP
                            </Button></td>
                            <UncontrolledPopover placement="left" trigger="hover" target={"#p" + application._id}>
                                <PopoverBody>
                                    <Card><CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}><Table responsive striped dark><thead>
                                        <tr className="text-center">
                                            <th>Education</th>
                                            <th>Start year</th>
                                            <th>End year</th>
                                        </tr>
                                    </thead>{Rendereducation(application.education)}</Table></CardBody></Card></PopoverBody>
                            </UncontrolledPopover>
                            <UncontrolledPopover placement="left" trigger="hover" target={"#s" + application._id}>
                                <PopoverBody>
                                    <Card><CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}><Table responsive striped dark><thead>
                                        <tr className="text-center">
                                            <th>Skill</th>
                                        </tr>
                                    </thead>{Renderskills(application.skills)}</Table></CardBody></Card></PopoverBody>
                            </UncontrolledPopover>
                            <UncontrolledPopover placement="left" trigger="hover" target={"#d" + application._id}>
                                <PopoverBody>
                                    <Card><CardBody className="card border-dark" style={{ backgroundColor: '#eocdbe' }}>{application.sop}</CardBody></Card></PopoverBody>
                            </UncontrolledPopover>
                            <td><Link className={color} to={
                                {
                                    pathname: "/recruiter/recruit/next",
                                    state: {
                                        appid: application._id,
                                        display: display
                                    }
                                }
                            }>{display}</Link></td >
                            <td><Link className="btn btn-danger" to={
                                {
                                    pathname: "/recruiter/recruit/reject",
                                    state: {
                                        appid: application._id
                                    }
                                }
                            }>Reject</Link></td >
                        </tr>
                        )
                    })}

                </tbody>
            );
        }

        if (this.state.load == false) {
            return <h1>Loading...</h1>
        }
        return (
            <div style={{ backgroundColor: '#f5f0e1' }}>
                <HeaderRecruiter />
                <div className="container" style={{ minHeight: '600px', marginTop: '40px' }}>
                    <div class="table-responsive">

                        <Table className="table table-hover table-bordered table-sm table-dark table-striped">
                            <thead>
                                <tr className=" text-center">
                                    <th>Applicant name <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortname}><span className={this.state.sortnameicon}></span></button></th>
                                    <th>Date of Application <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortdateofapplication}><span className={this.state.sortdateofapplicationicon}></span></button></th>
                                    <th>Rating <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortrating}><span className={this.state.sortratingicon}></span></button></th>
                                    <th>Stage</th>
                                    <th>Education </th>
                                    <th>Skills </th>
                                    <th>SOP </th>
                                    <th>Reject </th>
                                    <th>Respond </th>
                                </tr>
                            </thead>
                            {Renderapplications(this.state.actual)}
                        </Table>
                    </div>
                </div>

            </div>

        );
    }
}
export default Recruit;
