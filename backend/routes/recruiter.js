const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const restrictAccess = require('../check_authenticated');

const recruiterRouter = express.Router();
const Recruiters = require('../models/recruiter');
const Jobs = require('../models/job');
const Applications = require('../models/application')
const Applicants = require('../models/applicant');
const Ratings = require('../models/rating');
const { application } = require('express');

recruiterRouter.use(bodyParser.json());
recruiterRouter.route('/dashboard')
    .get(restrictAccess((req, res, result) => {
        Jobs.find({ recruiterid: result.id })
            .then((jobs) => {
                activejobs = jobs.filter((x) => { return x.number_position > x.number_positions_filled && x.deleted == false; })
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(activejobs);
            })
            .catch((err) => console.log(err));
    }));


recruiterRouter.route('/recruit')
    .post(restrictAccess((req, res, result) => {
        Applications.find({ jobid: req.body.jobid })
            .then((applications) => {
                nonRejectedApplications = applications.filter((x) => { return x.accepted == false && x.rejected == false; })
                var len = nonRejectedApplications.length;
                const array = [];
                if (len == 0) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(array);
                }
                nonRejectedApplications.forEach((appli) => {
                    Applicants.findById(appli.applicantid)
                        .then((applicant) => {
                            console.log(appli);
                            reso = JSON.parse(JSON.stringify(appli));
                            reso.skills = applicant.skills;
                            reso.education = applicant.education;
                            reso.name = applicant.firstname + " " + applicant.lastname;
                            reso.rating = applicant.rating;
                            array.push(reso);
                            if (array.length == len) {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(array);
                            }
                        })
                        .catch((err) => console.log(err));
                })

            })
            .catch((err) => console.log(err));
    }));

recruiterRouter.route('/employees')
    .get(restrictAccess((req, res, result) => {
        Applications.find({ recruiterid: result.id, accepted: true })
            .then((employeesApp) => {
                var len = employeesApp.length;
                // console.log(employeesApp);
                const array = [];
                if (len == 0) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(array);
                }
                employeesApp.forEach((emp) => {
                    // reso = JSON.parse(JSON.stringify(emp));

                    Applicants.findById(emp.applicantid)
                        .then((applicant) => {
                            emp = JSON.parse(JSON.stringify(emp));
                            emp.name = applicant.firstname + " " + applicant.lastname;
                            emp.rating = applicant.rating;
                            emp.rated = false;
                            Ratings.find({ employeeid: emp.applicantid, recruiterid: result.id })
                                .then((rating) => {
                                    if (rating.length != 0) {
                                        emp.rated = true;
                                        console.log(rating);
                                    }
                                    Jobs.findById(emp.jobid)
                                        .then((job) => {
                                            if (job != null)
                                                emp.type = job.typeofjob;
                                            array.push(emp);
                                            reso1 = JSON.parse(JSON.stringify(emp));
                                            console.log(reso1);
                                            if (array.length == len) {
                                                res.statusCode = 200;
                                                res.setHeader("Content-Type", "application/json");
                                                res.json(array);
                                            }
                                        })
                                        .catch((err) => console.log(err));
                                })
                                .catch((err) => console.log(err));

                        })
                        .catch((err) => console.log(err));
                })

            })
            .catch((err) => console.log(err));
    }));

recruiterRouter.route('/profile')
    .get(restrictAccess((req, res, result) => {
        Recruiters.findById(result.id)
            .then((profile) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                var userprofile = {
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    contact: profile.contact,
                    bio: profile.bio,
                    email: profile.email
                }
                res.json(userprofile);
            })
            .catch((err) => console.log(err));
    }))
    .put(restrictAccess((req, res, result) => {
        Recruiters.findById(result.id)
            .then((profile) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                profile.firstname = req.body.firstname;
                profile.lastname = req.body.lastname;
                profile.contact = req.body.contact;
                profile.bio = req.body.bio;
                profile.save().then((newprofile) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(newprofile);
                }).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }));

recruiterRouter.route('/createjob')
    .post(restrictAccess((req, res, result) => {
        const data = {
            title: req.body.title,
            number_application: req.body.number_application,
            number_position: req.body.number_position,
            deadlinedate: req.body.deadlinedate,
            deadlinetime: req.body.deadlinetime,
            deadlineorgdate: req.body.deadlineorgdate,
            typeofjob: req.body.typeofjob,
            duration: req.body.duration,
            salary: req.body.salary,
            skills: req.body.skills,
            recruiterid: result.id,
            recruitername: result.name,
        }
        Jobs.create(data)
            .then((job) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(job);
            })
            .catch((err) => console.log(err));
    }));

recruiterRouter.route('/rate')
    .post(restrictAccess((req, res, result) => {
        // console.log(result.id + " " + result._id);//result.id should be used
        Ratings.find({ recruiterid: result.id, employeeid: req.body.employeeid })
            .then((rating) => {
                if (rating.length != 0) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ err: "Already rated" });
                }
                else {
                    console.log(rating);
                    console.log(req.body.employeeid);

                    Applicants.findById(req.body.employeeid)
                        .then((employee) => {
                            console.log(employee);
                            var tot = parseInt(employee.totrating);
                            var num = employee.number_rated;
                            var sum = parseInt(req.body.rating);
                            sum += tot;
                            // console.log(typeof req.body.rating + " " + num + " " + sum);
                            employee.totrating = sum;
                            employee.number_rated = (num + 1);
                            var k = sum / (num + 1);
                            employee.rating = k;
                            employee.save().then((nemp) => {
                                var rating = new Ratings();
                                rating.employeeid = req.body.employeeid;
                                rating.recruiterid = result.id;
                                rating.save().then(() => {
                                    res.statusCode = 200;
                                    res.setHeader("Content-Type", "application/json");
                                    res.json({ err: "Thanks for your feedback" });
                                })
                                    .catch((err) => console.log(err));

                            })
                                .catch((err) => console.log(err));

                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));

    }));


recruiterRouter.route('/job')
    .post(restrictAccess((req, res, result) => {
        Jobs.findById(req.body.jobid)
            .then((reso) => {
                console.log(req.body);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(reso);
            })
            .catch((err) => console.log(err));
    }))
    .delete(restrictAccess((req, res, result) => {
        Jobs.findById(req.body.jobid)
            .then((reso) => {
                reso.deleted = true;
                reso.save().then((nreso) => {
                    Applications.find({ jobid: req.body.jobid })
                        .then((applications) => {
                            var len = applications.length;
                            const array = [];
                            if (len == 0) {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(array);
                            }
                            applications.forEach((appli) => {
                                if (appli.accepted == true) {
                                    appli.accepted = false;
                                    appli.stage = "Deleted";
                                }
                                appli.save().then((nappli) => {
                                    Applicants.findById(nappli.applicantid)
                                        .then((napplicant) => {
                                            napplicant.accepted = false;
                                            napplicant.rated = false;
                                            if (napplicant.number_application > 0)
                                                napplicant.number_application = napplicant.number_application - 1;
                                            napplicant.save(nreso).then(() => {
                                                array.push(nreso);
                                                if (array.length == len) {
                                                    res.statusCode = 200;
                                                    res.setHeader("Content-Type", "application/json");
                                                    res.json({ success: "OK" });
                                                }
                                            })
                                                .catch((err) => console.log(err));
                                        })
                                        .catch((err) => console.log(err));
                                })
                                    .catch((err) => console.log(err));
                            })
                        })
                        .catch((err) => console.log(err));
                })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }))
    .put(restrictAccess((req, res, result) => {
        Jobs.findById(req.body.jobid)
            .then((job) => {
                job.number_position = req.body.number_position;
                job.number_application = req.body.number_application;
                if (req.body.deadlinedate != '')
                    job.deadlinedate = req.body.deadlinedate;
                if (req.body.deadlinetime != '')
                    job.deadlinetime = req.body.deadlinetime;
                job.deadlineorgdate = req.body.deadlineorgdate;
                job.save().then((updjob) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(updjob);
                })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }));


recruiterRouter.route('/recruit/reject')
    .post(restrictAccess((req, res, result) => {
        Applications.findById(req.body.appid)
            .then((reso) => {
                reso.rejected = true;
                reso.stage = "Rejected";
                reso.save().then((fun) => {
                    Applicants.findById(reso.applicantid)
                        .then((applicant) => {
                            applicant.number_application = applicant.number_application - 1;
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(fun);
                        })
                        .catch((err) => console.log(err));

                })
                    .catch((err) => console.log(err));

            })
            .catch((err) => console.log(err));
    }));

recruiterRouter.route('/recruit/next')
    .post(restrictAccess((req, res, result) => {
        Applications.findById(req.body.appid)
            .then((reso) => {
                console.log(reso);
                if (reso.stage.localeCompare("Applied") == 0) {
                    reso.stage = "Shortlisted";
                    reso.save().then((nreso) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ err: "Shortlisted !" });
                    })
                        .catch((err) => console.log(err));
                }
                else if (reso.stage.localeCompare("Shortlisted") == 0) {
                    Applicants.findById(reso.applicantid)
                        .then((applicant) => {
                            if (applicant.accepted == true) {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json({ err: "Already accepted by some other recruiter" });
                            }
                            else {
                                Jobs.findById(reso.jobid).then((job) => {
                                    if (job.number_position == job.number_positions_filled) {
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        res.json({ err: "All positions filled" });
                                    }
                                    job.number_positions_filled = job.number_positions_filled + 1;
                                    job.save().then(() => {
                                        reso.stage = "Accepted";
                                        reso.accepted = true;
                                        reso.acceptdate = Date.now();
                                        reso.save().then((nreso) => {
                                            applicant.accepted = true;
                                            applicant.number_application = 1;
                                            applicant.save().then((napplicant) => {
                                                Applications.find({ applicantid: applicant._id })
                                                    .then((applications) => {
                                                        var len = applications.length
                                                        var cnt = 0;
                                                        applications.forEach((apli) => {
                                                            if (req.body.appid.localeCompare(apli._id)) {
                                                                apli.rejected = true;
                                                                apli.stage = "Rejected";
                                                            }
                                                            apli.save().then(() => {
                                                                cnt = cnt + 1;
                                                                if (cnt == len) {
                                                                    res.statusCode = 200;
                                                                    res.setHeader("Content-Type", "application/json");
                                                                    res.json({ err: "Accepted !" });

                                                                }
                                                            })
                                                                .catch((err) => console.log(err));
                                                        })
                                                    })
                                                    .catch((err) => console.log(err));
                                            })
                                                .catch((err) => console.log(err));
                                        })
                                            .catch((err) => console.log(err));
                                    })
                                        .catch((err) => console.log(err));
                                })
                                    .catch((err) => console.log(err));
                            }

                        })
                        .catch((err) => console.log(err));
                }
                else {
                    res.json({ err: "They cant be shortlisted or accepted" })
                }
            })
            .catch((err) => console.log(err));
    }));

module.exports = recruiterRouter;

