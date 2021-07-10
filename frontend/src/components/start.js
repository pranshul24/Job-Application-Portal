import { Jumbotron } from 'reactstrap';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import pic from '../assets/job.svg'

class StartPage extends Component {
    render() {
        return (

            <div style={{ backgroundColor: '#f5f0e1' }}>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Job Application Portal</h1>
                                <p>Welcome to the job portal where you can easily apply for jobs or recruit applicants !</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <div className="container" style={{ minHeight: '450px', marginTop: '50px' }}>
                    <div className="row">
                        <div className="col-12 text-center">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <h4 className="text-center">Bringing Applicants and Recruiters closer !</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src={pic} height="270"></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <Link to="/register" className="btn btn-outline-primary btn-block">Register</Link>
                            {' '}<Link to="/login" className="btn btn-outline-danger btn-block">Login</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default StartPage;
