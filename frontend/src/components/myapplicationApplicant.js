import React, { Component } from 'react';
import HeaderApplicant from "./HeaderComponentApplicant"
// reactstrap components
import { Button, Table, Row, Input, FormText, FormFeedback } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FuzzySearch from 'fuzzy-search';
class MyapplicationApplicant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            load: false,
            searchvalue: '',
            sortsalary: false,
            sortduration: false,
            sortrating: false,
            sortsalarytype: "",
            sortdurationtype: "",
            sortdurationicon: 'fa fa-sort',
            sortratingtype: "",
            actual: '',
            sortsalaryicon: 'fa fa-sort',
            sortratingicon: 'fa fa-sort',
            type: 'All',
            duration: '7',
            low: '',
            high: '',
            actualonsearch: ''
        };

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        axios({
            method: "GET",
            url: "http://localhost:3002/applicant/myapplication",
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
    handleChange(event) {
        var value = event.target.value;
        this.setState({
            searchvalue: value
        });
    }

    render() {
        function Fun(appid, accepted, rated) {
            if (rated == true) {
                return (<td><Button className="btn btn-success btn-sm disabled">Done</Button></td>)
            }
            else {
                if (accepted == true) {
                    return (
                        <td><Link className="btn btn-primary btn-sm" to={
                            {
                                pathname: "/applicant/rate",
                                state: {
                                    appid: appid
                                }
                            }
                        }>Rate</Link></td >
                    )
                }
                else {
                    return (
                        <td>NA</td>
                    )
                }
            }
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
                        return (<tr className="text-center">
                            <td>{application.title}</td>
                            <td>{new Date(application.acceptdate).toDateString()}</td>
                            <td>{application.salary}</td>
                            <td>{application.recruitername}</td>
                            <td>{application.stage}</td>
                            {Fun(application._id, application.accepted, application.rated)}
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
                <div className="container" style={{ minHeight: '600px' }}>
                    <Row>
                        <div className="col-md-12">
                            <div className="container">
                                <Row style={{ marginTop: '15px' }}>
                                    <div class="table-responsive">

                                        <Table className="table table-hover table-bordered table-sm table-dark table-striped">
                                            <thead>
                                                <tr className=" text-center">
                                                    <th>Title </th>
                                                    <th>Date of Joining </th>
                                                    <th>Salary </th>
                                                    <th>Recruiter name </th>
                                                    <th>Application Status </th>
                                                    <th>Rate </th>
                                                </tr>
                                            </thead>
                                            {Renderapplications(this.state.actual)}
                                        </Table></div></Row>
                            </div>
                        </div>
                    </Row>

                </div>
            </div>

        );
    }
}
export default MyapplicationApplicant;
