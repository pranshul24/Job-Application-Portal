import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import { Switch, Route, Redirect } from 'react-router-dom';
import StartPage from './start';
import Login from './LoginComponent';
import Register from './RegisterComponent'
import AddJob from './AddJob'
import jwt_decode from 'jwt-decode';

import DashboardApplicant from './dashboardApplicant'
import MyapplicationApplicant from './myapplicationApplicant'
import DashboardRecruiter from './dashboardRecruiter'
import axios from 'axios'
import ProfileRecruiter from './RecruiterProfile';
import EditProfileRecruiter from './RecruiterProfileEdit';
import ProfileApplicant from './ApplicantProfile'
import EditProfileApplicant from './ApplicantProfileEdit';
import ApplyJob from './ApplyJob.js';
import ApplicantRateJob from './ApplicantRateJob';
import RecruiterRateEmployee from './RecruiterRateEmployee';
import JobDelete from './JobDelete';
import JobEdit from './JobEdit';
import Recruit from './Recruit';
import NextRound from './NextRound';
import Reject from './Reject';
import Employees from './Employees';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            type: '',
            token: null,
            id_user: '',
        };
        this.setuplogin = this.setuplogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    setuplogin(token) {
        if (this.state.loggedin == true) {
            return;
        }
        else {
            localStorage.setItem("Token", token);
            if (token != null) {
                axios.defaults.headers.common["Authorization"] = token;
            }
            var decrypt_token = jwt_decode(token);
            console.log(decrypt_token);
            this.setState({
                loggedin: true,
                id_user: decrypt_token.id,
                type: decrypt_token.type,
                token: token
            });
        }
    }

    logout() {
        if (localStorage && localStorage.Token != null) {
            localStorage.removeItem("Token");
        }
        this.setState({
            loggedin: false,
            type: '',
            token: null,
            id_user: ''
        });

        return <Redirect to="/" />
    }
    componentWillMount() {
        if (localStorage && localStorage.Token != null) {
            this.setuplogin(localStorage.Token);
        }
    }

    render() {
        const Start = () => {
            return (
                <StartPage
                />
            );
        }
        const CallRecruiterDashboard = () => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <DashboardRecruiter
                />
            );
        }
        const CallRecruiterProfile = () => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/profile" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/profile" />
                    }
                }
            }
            return (
                <ProfileRecruiter
                />
            );
        }
        const CallApplicantProfile = () => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/profile" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/profile" />
                    }
                }
            }
            return (
                <ProfileApplicant
                />
            );
        }
        const CallRecruiterProfileEdit = () => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/profile" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/profile" />
                    }
                }
            }
            return (
                <EditProfileRecruiter
                />
            );
        }
        const CallApplicantProfileEdit = () => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/profile" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/profile" />
                    }
                }
            }
            return (
                <EditProfileApplicant
                />
            );
        }
        const CallApplicantDashboard = () => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <DashboardApplicant
                />
            );
        }

        const CallApplicantMyapplication = () => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <MyapplicationApplicant
                />
            );
        }

        const CallApplyJob = (fun) => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <ApplyJob jobid={fun.jobid}
                />
            );
        }

        const CallApplicantRateJob = (fun) => {
            var allowed = "Applicant";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <ApplicantRateJob appid={fun.appid}
                />
            );
        }

        const CallRecruiterRateEmployee = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <RecruiterRateEmployee employeeid={fun.employeeid}
                />
            );
        }

        const CallJobDelete = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <JobDelete jobid={fun.jobid}
                />
            );
        }

        const CallJobEdit = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <JobEdit jobid={fun.jobid}
                />
            );
        }

        const CallRecruit = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <Recruit jobid={fun.jobid}
                />
            );
        }

        const CallNextRound = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <NextRound appid={fun.appid} display={fun.display}
                />
            );
        }


        const CallReject = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <Reject appid={fun.appid}
                />
            );
        }
        const CallEmployees = (fun) => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <Employees
                />
            );
        }

        const CallLogin = () => {
            if (this.state.loggedin == false) {
                return (
                    <Login setuplogin={this.setuplogin} />
                );
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    return <Redirect to="/applicant/dashboard" />
                }
                else {
                    return <Redirect to="/recruiter/dashboard" />
                }
            }

        }
        const CallStart = () => {
            if (this.state.loggedin == false) {
                return (
                    <Start />
                );
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    return <Redirect to="/applicant/dashboard" />
                }
                else {
                    return <Redirect to="/recruiter/dashboard" />
                }
            }

        }

        const CallAddJob = () => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Redirect to="/" />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/applicant/dashboard" />
                    }
                }
                else {
                    if (this.state.type.localeCompare(allowed) != 0) {
                        return <Redirect to="/recruiter/dashboard" />
                    }
                }
            }
            return (
                <AddJob
                />
            );
        }
        const CallRegister = () => {
            var allowed = "Recruiter";
            if (this.state.loggedin == false) {
                return <Register />
            }
            else {
                if (this.state.type.localeCompare("Applicant") == 0) {
                    return <Redirect to="/applicant/dashboard" />
                }
                else {
                    return <Redirect to="/recruiter/dashboard" />
                }
            }
        }

        return (
            <div>
                <Switch>
                    <Route exact path='/' component={CallStart} />
                    <Route exact path='/login' component={CallLogin} />
                    <Route exact path='/register' component={CallRegister} />
                    <Route exact path='/recruiter/add' component={CallAddJob} />
                    <Route exact path='/applicant/dashboard' component={CallApplicantDashboard} />
                    <Route exact path='/recruiter/dashboard' component={CallRecruiterDashboard} />
                    <Route exact path='/recruiter/profile' component={CallRecruiterProfile} />
                    <Route exact path='/applicant/profile' component={CallApplicantProfile} />
                    <Route exact path='/applicant/profile/edit' component={CallApplicantProfileEdit} />
                    <Route exact path='/recruiter/profile/edit' component={CallRecruiterProfileEdit} />
                    <Route exact path="/logout" render={this.logout} />
                    <Route exact path="/applicant/apply" render={(props) => <CallApplyJob jobid={props.location.state.jobid} />} />
                    <Route exact path='/applicant/myapplication' component={CallApplicantMyapplication} />
                    <Route exact path="/applicant/rate" render={(props) => <CallApplicantRateJob appid={props.location.state.appid} />} />
                    <Route exact path="/recruiter/rate" render={(props) => <CallRecruiterRateEmployee employeeid={props.location.state.employeeid} />} />
                    <Route exact path='/recruiter/job/delete' render={(props) => <CallJobDelete jobid={props.location.state.jobid} />} />
                    <Route exact path='/recruiter/job/edit' render={(props) => <CallJobEdit jobid={props.location.state.jobid} />} />
                    <Route exact path='/recruiter/recruit' render={(props) => <CallRecruit jobid={props.location.state.jobid} />} />
                    <Route exact path='/recruiter/recruit/next' render={(props) => <CallNextRound appid={props.location.state.appid} display={props.location.state.display} />} />
                    <Route exact path='/recruiter/recruit/reject' render={(props) => <CallReject appid={props.location.state.appid} />} />
                    <Route exact path='/recruiter/employees' render={(props) => <CallEmployees />} />
                    <Redirect to="/" />
                </Switch>
            </div >
        );
    }
}

export default Main;