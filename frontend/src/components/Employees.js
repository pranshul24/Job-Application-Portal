import React, { Component } from 'react';
import HeaderRecruiter from "./HeaderComponentRecruiter"

// reactstrap components
import { UncontrolledPopover, PopoverHeader, PopoverBody, Button, Table, Row, Input, FormText, FormFeedback, UncontrolledCollapse, Card, CardBody } from "reactstrap";
import axios from 'axios';
import { Link } from 'react-router-dom';
class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: '',
            load: false,
            actual: '',
            sortname: false,
            sorttitle: false,
            sorttitletype: "",
            sorttitleicon: "fa fa-sort",
            sortdateofjoining: false,
            sortrating: false,
            sortnametype: "",
            sortdateofjoiningtype: "",
            sortdateofjoiningicon: 'fa fa-sort',
            sortratingtype: "",
            sortnameicon: 'fa fa-sort',
            sortratingicon: 'fa fa-sort',
        };
        this.handlesortdateofjoining = this.handlesortdateofjoining.bind(this);
        this.handlesortname = this.handlesortname.bind(this);
        this.handlesorttitle = this.handlesorttitle.bind(this);
        this.handlesortrating = this.handlesortrating.bind(this);

    }

    handlesortdateofjoining() {
        if (this.state.sortdateofjoining) {
            if (this.state.sortdateofjoiningtype.localeCompare("asc") == 0) {
                this.setState({
                    sortdateofjoiningtype: "desc",
                    sortdateofjoiningicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    var da = new Date(a.acceptdate),
                        db = new Date(b.acceptdate);
                    return db - da;
                });
            }
            else {
                this.setState({
                    sortdateofjoiningtype: "asc",
                    sortdateofjoiningicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    var da = new Date(a.acceptdate),
                        db = new Date(b.acceptdate);
                    return da - db;
                });
            }
        }
        else {
            this.setState({
                sortdateofjoining: "true",
                sortdateofjoiningtype: "asc",
                sortdateofjoiningicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                var da = new Date(a.acceptdate),
                    db = new Date(b.acceptdate);
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
        this.setState({
            sorttitle: false,
            sorttitleicon: "fa fa-sort"
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
            sortdateofjoining: false,
            sortdateofjoiningicon: "fa fa-sort"
        });
        this.setState({
            sortname: false,
            sortnameicon: "fa fa-sort"
        });
        this.setState({
            sorttitle: false,
            sorttitleicon: "fa fa-sort"
        });
    }
    handlesortname() {
        if (this.state.actual == null)
            return;
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
            sortdateofjoining: false,
            sortdateofjoiningicon: "fa fa-sort"
        });
        this.setState({
            sorttitle: false,
            sorttitleicon: "fa fa-sort"
        });
    }

    handlesorttitle() {
        if (this.state.sorttitle) {
            if (this.state.sorttitletype.localeCompare("asc") == 0) {
                this.setState({
                    sorttitletype: "desc",
                    sorttitleicon: "fa fa-sort-desc"
                });
                this.state.actual.sort((a, b) => {
                    var fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();

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
                    sorttitletype: "asc",
                    sorttitleicon: "fa fa-sort-asc"
                });
                this.state.actual.sort((a, b) => {
                    var fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();

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
                sorttitle: "true",
                sorttitletype: "asc",
                sorttitleicon: "fa fa-sort-asc"
            });
            this.state.actual.sort((a, b) => {
                var fa = a.title.toLowerCase(),
                    fb = b.title.toLowerCase();

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
            sortdateofjoining: false,
            sortdateofjoiningicon: "fa fa-sort"
        });
        this.setState({
            sortname: false,
            sortnameicon: "fa fa-sort"
        });
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:3002/recruiter/employees"
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
        function Fun(employeeid, rated) {
            if (rated == true) {
                return (<td><Button className="btn btn-success disabled btn-sm">Done</Button></td>)
            }
            else {
                return (
                    <td><Link className="btn btn-danger btn-sm" to={
                        {
                            pathname: "/recruiter/rate",
                            state: {
                                employeeid: employeeid
                            }
                        }
                    }>Rate Employee</Link></td >
                )
            }
        }
        function Renderemployees(employees) {
            if (!employees) {
                return (
                    <tbody>
                    </tbody>
                );
            }
            return (
                <tbody>
                    {employees.map((employee) => {
                        return (<tr className="text-center" key={"q" + employee._id}>
                            <td>{employee.name}</td>
                            <td>{new Date(employee.date).toDateString()}</td>
                            <td>{employee.type}</td>
                            <td>{employee.title}</td>
                            <td>{employee.rating}</td>
                            {Fun(employee.applicantid, employee.rated)}
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
                                <tr className="text-center">
                                    <th>Applicant name  <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortname}><span className={this.state.sortnameicon}></span></button></th>
                                    <th>Date of Joining  <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortdateofjoining}><span className={this.state.sortdateofjoiningicon}></span></button></th>
                                    <th>Job type </th>
                                    <th>Job title <button className="btn btn-outline-primary btn-sm" onClick={this.handlesorttitle}><span className={this.state.sorttitleicon}></span></button></th>
                                    <th>Rating <button className="btn btn-outline-primary btn-sm" onClick={this.handlesortrating}><span className={this.state.sortratingicon}></span></button></th>
                                    <th>Rate Employee </th>
                                </tr>
                            </thead>
                            {Renderemployees(this.state.actual)}
                        </Table></div>

                </div>

            </div>

        );
    }
}
export default Employees;
