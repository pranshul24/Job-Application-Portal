import React, { Component } from 'react';
import HeaderApplicant from "./HeaderComponentApplicant"
// reactstrap components
import { Button, Table, Row, Input, FormText, FormFeedback } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
import FuzzySearch from 'fuzzy-search';
class DashboardApplicant extends Component {
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
        this.handlesortduration = this.handlesortduration.bind(this);
        this.handlesortsalary = this.handlesortsalary.bind(this);
        this.handlesortrating = this.handlesortrating.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAll = this.handleAll.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);

    }

    componentDidMount() {

        axios({
            method: "GET",
            url: "http://localhost:3002/applicant/dashboard",
        }).then((response) => {
            console.log(response);
            this.setState({
                profile: response.data,
                actual: response.data,
                actualonsearch: response.data,
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
    handleFilterChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleFilterSubmit(event) {
        event.preventDefault();
        var array = this.state.actualonsearch.filter((x) => { return x.duration < this.state.duration; })
        if (this.state.high != '' && this.state.low != '')
            var array1 = array.filter((x) => { return x.salary <= this.state.high && x.salary >= this.state.low; })
        else if (this.state.high != '')
            var array1 = array.filter((x) => { return x.salary <= this.state.high; })
        else if (this.state.low != '')
            var array1 = array.filter((x) => { return x.salary >= this.state.low; })
        else {
            var array1 = array.slice(0);
        }
        if (this.state.type.localeCompare("All") != 0) {
            var array2 = array1.filter((x) => { return x.typeofjob.localeCompare(this.state.type) == 0; })
            this.setState({
                actual: array2,
                sortrating: false,
                sortratingicon: "fa fa-sort",
                sortsalary: false,
                sortsalaryicon: "fa fa-sort",
                sortduration: false,
                sortdurationicon: "fa fa-sort",
            });
        }
        else {
            this.setState({
                actual: array1,
                sortrating: false,
                sortratingicon: "fa fa-sort",
                sortsalary: false,
                sortsalaryicon: "fa fa-sort",
                sortduration: false,
                sortdurationicon: "fa fa-sort",
            });
        }
    }
    handleAll(event) {
        this.setState({
            actual: this.state.profile,
            actualonsearch: this.state.profile,
            sortrating: false,
            sortratingicon: "fa fa-sort",
            sortsalary: false,
            sortsalaryicon: "fa fa-sort",
            sortduration: false,
            sortdurationicon: "fa fa-sort",
            searchvalue: ''
        });
    }
    handleSearch(event) {
        const searcher = new FuzzySearch(this.state.profile, ['title'], {
            caseSensitive: false, sort: true
        });
        const searchresult = searcher.search(this.state.searchvalue);
        this.setState({
            actualonsearch: searchresult,
            actual: searchresult,
            sortrating: false,
            sortratingicon: "fa fa-sort",
            sortsalary: false,
            sortsalaryicon: "fa fa-sort",
            sortduration: false,
            sortdurationicon: "fa fa-sort", type: "All", duration: '7', low: '', high: ''
        });
    }
    handlesortduration() {
        if (this.state.sortduration) {
            if (this.state.sortdurationtype.localeCompare("asc") == 0) {
                this.setState({
                    sortdurationtype: "desc",
                    sortdurationicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    return b.duration - a.duration;
                });
            }
            else {
                this.setState({
                    sortdurationtype: "asc",
                    sortdurationicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    return a.duration - b.duration;
                });
            }
        }
        else {
            this.setState({
                sortduration: "true",
                sortdurationtype: "asc",
                sortdurationicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                return a.duration - b.duration;
            });
        }
        this.setState({
            sortrating: false,
            sortratingicon: "fa fa-sort"
        });
        this.setState({
            sortsalary: false,
            sortsalaryicon: "fa fa-sort"
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
            sortduration: false,
            sortdurationicon: "fa fa-sort"
        });
        this.setState({
            sortsalary: false,
            sortsalaryicon: "fa fa-sort"
        });
    }
    handlesortsalary() {
        if (this.state.sortsalary) {
            if (this.state.sortsalarytype.localeCompare("asc") == 0) {
                this.setState({
                    sortsalarytype: "desc",
                    sortsalaryicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    return b.salary - a.salary;
                });
            }
            else {
                this.setState({
                    sortsalarytype: "asc",
                    sortsalaryicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    return a.salary - b.salary;
                });
            }
        }
        else {
            this.setState({
                sortsalary: "true",
                sortsalarytype: "asc",
                sortsalaryicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                return a.salary - b.salary;
            });
        }
        this.setState({
            sortrating: false,
            sortratingicon: "fa fa-sort"
        });
        this.setState({
            sortduration: false,
            sortdurationicon: "fa fa-sort"
        });

    }
    render() {
        function Fun(jobid, position, filled, applied, maxapplication, appliedapplication, accepted) {
            if (filled < position && appliedapplication < maxapplication) {
                if (applied == true) {
                    return (
                        <td><Button className="btn btn-success disabled">Applied</Button></td >
                    )
                }
                else {
                    if (accepted == false) {
                        return (
                            <td><Link className="btn btn-info" to={
                                {
                                    pathname: "/applicant/apply",
                                    state: {
                                        jobid: jobid
                                    }
                                }
                            }>Apply</Link></td >
                        )
                    }
                    else {
                        return (
                            <td><Button className="btn btn-info disabled">Apply</Button></td >
                        )
                    }
                }

            }
            else {
                return (
                    <td><Button className="btn btn-danger disabled">Full</Button></td>
                )
            }
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
                            <td>{job.recruitername}</td>
                            <td>{job.rating}</td>
                            <td>{job.salary}</td>
                            <td>{job.duration}</td>
                            <td>{job.deadlinedate}</td>
                            <td>{job.typeofjob}</td>
                            {console.log(job.applied)}
                            {Fun(job._id, job.number_position, job.number_positions_filled, job.applied, job.number_application, job.number_applications_applied, job.accepted)}
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
                        <div className="col-md-2">
                            <div className="container">
                                <Row style={{ marginTop: '5px' }} className="justify-content-center">
                                    <h3 >Filter</h3>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Input type="number" id="low" name="low" min={0} value={this.state.low} onChange={this.handleFilterChange}
                                    ></Input>
                                    <FormFeedback></FormFeedback>
                                    <FormText>Salary Lower Range</FormText>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Input type="number" id="high" name="high" min={0} onChange={this.handleFilterChange} value={this.state.high}
                                    ></Input>
                                    <FormFeedback></FormFeedback>
                                    <FormText>Salary Upper Range</FormText>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Input type="select" id="duration" name="duration" onChange={this.handleFilterChange} value={this.state.duration}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                    </Input>
                                    <FormFeedback></FormFeedback>
                                    <FormText>Duration Upper Range</FormText>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <Input type="select" id="type" name="type" onChange={this.handleFilterChange} value={this.state.type}
                                        style={{ marginTop: '5px' }}>
                                        <option>All</option>
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Work from home</option>
                                    </Input>
                                    <FormText>Job Type</FormText>

                                </Row>
                                <Row className="justify-content-center">
                                    <button className="btn btn-outline-danger " style={{ marginTop: '25px' }} onClick={this.handleFilterSubmit}>
                                        Filter
                                    </button>
                                </Row>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="container">

                                <Row style={{ marginTop: '5px' }}>
                                    <div class="input-group">
                                        <input type="search" class="form-control rounded" placeholder="Search according to Job Title" aria-label="Search"
                                            aria-describedby="search-addon" style={{ width: "20rem", background: "#F2F1F9", padding: "0.5rem" }} value={this.state.searchvalue} onChange={this.handleChange} />
                                        <button type="button" class="btn btn-outline-primary" onClick={this.handleSearch}><span className="fa fa-search fa-lg"></span></button>
                                        <button type="button" class="btn btn-outline-danger" onClick={this.handleAll}>All</button>
                                    </div>
                                </Row>
                                <Row style={{ marginTop: '15px' }}>
                                    <div class="table-responsive">

                                        <Table className="table table-hover table-bordered table-sm table-dark table-striped">
                                            <thead>
                                                <tr className=" text-center">
                                                    <th>Title</th>
                                                    <th>Recruiter name</th>
                                                    <th>Job rating <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortrating}><span className={this.state.sortratingicon}></span></button></th>
                                                    <th>Salary <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortsalary}><span className={this.state.sortsalaryicon}></span></button></th>
                                                    <th>Duration <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortduration}><span className={this.state.sortdurationicon}></span></button></th>
                                                    <th>Deadline</th>
                                                    <th>Job type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            {Renderjobs(this.state.actual)}
                                        </Table></div></Row>
                            </div>
                        </div>
                    </Row>

                </div>
            </div>

        );
    }
}
export default DashboardApplicant;
