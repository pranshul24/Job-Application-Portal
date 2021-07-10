import React, { Component } from 'react';
import HeaderRecruiter from "./HeaderComponentRecruiter"
// reactstrap components
import { Button, Table, Row, Input, FormText, FormFeedback } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FuzzySearch from 'fuzzy-search';
class DashboardRecruiter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            load: false,
            actual: '',
        };
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        axios({
            method: "GET",
            url: "http://localhost:3002/recruiter/dashboard",
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
        function Fun(jobid) {
            return (
                <td><Link className="btn btn-danger btn-sm" to={
                    {
                        pathname: "/recruiter/job/delete",
                        state: {
                            jobid: jobid
                        }
                    }
                }>Delete</Link></td >
            )
        }
        function Fun2(jobid) {
            return (
                <td><Link className="btn btn-success btn-sm" to={
                    {
                        pathname: "/recruiter/job/edit",
                        state: {
                            jobid: jobid
                        }
                    }
                }>Edit</Link></td >
            )
        }
        function Renderjobs(jobs) {
            if (!jobs) {
                return (
                    <tbody>
                    </tbody>
                );
            }
            return (
                <tbody>
                    {jobs.map((job) => {
                        return (<tr className="text-center">
                            <td>{job.title}</td>
                            <td>{new Date(job.postdate).toDateString()}</td>
                            <td>{job.number_applications_applied}</td>
                            <td>{job.number_position - job.number_positions_filled}</td>
                            {Fun(job._id)}
                            {Fun2(job._id)}
                            <td><Link className="btn btn-dark btn-sm" to={
                                {
                                    pathname: "/recruiter/recruit",
                                    state: {
                                        jobid: job._id
                                    }
                                }
                            }>Recruit</Link></td>
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
                <HeaderRecruiter />
                <div className="container" style={{ minHeight: '600px', marginTop: '40px' }}>
                    <div class="table-responsive">
                        <Table className="table table-hover table-bordered table-sm table-dark table-striped">
                            <thead>
                                <tr className="text-center">
                                    <th>Title</th>
                                    <th>Date of Posting </th>
                                    <th>Number of Applicants </th>
                                    <th>Number of remaining positions </th>
                                    <th>Delete </th>
                                    <th>Edit </th>
                                    <th>Recruit </th>
                                </tr>
                            </thead>
                            {Renderjobs(this.state.actual)}
                        </Table></div>
                </div>
            </div>

        );
    }
}
export default DashboardRecruiter;
