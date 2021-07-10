const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const restrictAccess = require('../check_authenticated');
const multer = require('multer');
const applicantRouter = express.Router();
const Applicants = require('../models/applicant');
const Jobs = require('../models/job');
const Applications = require('../models/application');
const jwt = require("jsonwebtoken");
const config = require("../config");
const { application } = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/resume');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const authentication2 = function (req, res, next) {
    // handle authentication
    let token = req.headers.authorization;

    if (!token) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        var err = "Unauthorized to access this page";
        next(err);
    }

    [, token] = token.split(" ");

    jwt.verify(token, config.secretKey, (err, result) => {
        if (err) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: "Unauthorized to access this page" });
            next(err);
        }
        else if (!err) {
            return next();
        }
    });
}

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const pdfFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('You can upload only pdf files!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 5000000 } });
const upload2 = multer({ storage: storage2, fileFilter: pdfFileFilter });

applicantRouter.use(bodyParser.json());
applicantRouter.route('/dashboard')
    .get(restrictAccess((req, res, result) => {
        Applicants.findById(result.id)
            .then((applicant) => {
                Jobs.find({})
                    .then((jobs) => {
                        console.log(jobs.length);
                        var l = jobs.length;
                        var d = new Date();
                        var n = d.toLocaleTimeString();
                        finjobs = jobs.filter((x) => { return x.deleted == false })

                        const array = [];
                        var len = finjobs.length;
                        if (len == 0) {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(array);
                        }
                        finjobs.forEach((finjob) => {
                            Applications.find({ jobid: finjob.id })
                                .then((applications) => {
                                    console.log(result.id);
                                    reso = JSON.parse(JSON.stringify(finjob));
                                    if (applications.length == 0)
                                        reso.applied = false;
                                    else {
                                        check = applications.filter((x) => { return x.applicantid == result.id })
                                        if (check.length == 0)
                                            reso.applied = false;
                                        else if (check.length != 0)
                                            reso.applied = true;
                                    }
                                    if (applicant.accepted == true)
                                        reso.accepted = true;
                                    else {
                                        reso.accepted = false;
                                    }
                                    // res.applied = "newValue";
                                    console.log(reso);
                                    array.push(reso);
                                    if (array.length == len) {
                                        res.statusCode = 200;
                                        res.setHeader("Content-Type", "application/json");
                                        // console.log(array);
                                        res.json(array);
                                    }
                                })
                                .catch((err) => console.log(err));
                        });
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }));

applicantRouter.route('/apply')
    .post(restrictAccess((req, res, result) => {
        Jobs.findById(req.body.jobid)
            .then((jobs) => {
                if (jobs.number_positions_filled == jobs.number_position) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    // console.log("1");
                    res.json({ err: "Sorry all positions are filled !" })
                }
                else if (jobs.number_applications_applied == jobs.number_application) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    // console.log("1");
                    res.json({ err: "Sorry all applications are filled !" })
                }
                else {
                    Applications.find({ jobid: req.body.jobid, applicantid: result.id })
                        .then((applications) => {
                            if (applications.length != 0) {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                console.log(applications);
                                res.json({ err: "Already applied !" })
                            }
                            else {
                                console.log(result.id);
                                Applicants.findOne({ _id: result.id })
                                    .then((applicant) => {
                                        console.log("hi");
                                        console.log(applicant);
                                        if (applicant.number_application >= 10) {
                                            res.statusCode = 200;
                                            res.setHeader("Content-Type", "application/json");
                                            res.json({ err: "Hey you already have 10 open applications !" })
                                        }
                                        else if (applicant.accepted == true) {
                                            res.statusCode = 200;
                                            res.setHeader("Content-Type", "application/json");
                                            res.json({ err: "Hey you have already been accepted for another job !" })
                                        }
                                        else {
                                            applicant.number_application = applicant.number_application + 1;
                                            applicant.save().then(() => {
                                                jobs.number_applications_applied = jobs.number_applications_applied + 1;
                                                jobs.save().then(() => {
                                                    var application = new Applications();
                                                    application.sop = req.body.sop;
                                                    application.recruitername = jobs.recruitername;
                                                    application.recruiterid = jobs.recruiterid;
                                                    application.title = jobs.title;
                                                    application.applicantid = result.id;
                                                    application.jobid = req.body.jobid;
                                                    application.stage = "Applied";
                                                    application.save().then((application) => {
                                                        res.statusCode = 200;
                                                        res.setHeader("Content-Type", "application/json");
                                                        res.json({ err: "Done !" });

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
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }));


applicantRouter.route('/profile')
    .get(restrictAccess((req, res, result) => {
        Applicants.findById(result.id)
            .then((profile) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                var userprofile = {
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    education: profile.education,
                    skills: profile.skills,
                    email: profile.email,
                    userid: profile.id
                }
                res.json(userprofile);
            })
            .catch((err) => console.log(err));
    }))
    .put(restrictAccess((req, res, result) => {
        Applicants.findById(result.id)
            .then((profile) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                profile.firstname = req.body.firstname;
                profile.lastname = req.body.lastname;
                profile.education = req.body.education;
                profile.skills = req.body.skills;
                profile.save().then((newprofile) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(newprofile);
                })
            })
            .catch((err) => console.log(err));
    }));

applicantRouter.route('/profile/upload')
    .post(authentication2, upload.single('profileimage'), (req, res) => {
        Applicants.findById(req.body.userid)
            .then((profile) => {
                profile.profileimage = req.file.filename;
                profile.save().then((newprofile) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(newprofile);
                }).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

applicantRouter.route('/resume/upload')
    .post(authentication2, upload2.single('resume'), (req, res) => {
        Applicants.findById(req.body.userid)
            .then((profile) => {
                profile.resume = req.file.filename;
                profile.save().then((newprofile) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(newprofile);
                }).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    });

applicantRouter.route('/myapplication')
    .get(restrictAccess((req, res, result) => {
        Applications.find({ applicantid: result.id })
            .then((applications) => {
                const array = [];
                var len = applications.length;
                console.log(len);
                if (len == 0) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(array);
                }
                applications.forEach((application) => {
                    Jobs.findById(application.jobid)
                        .then((job) => {
                            reso = JSON.parse(JSON.stringify(application));
                            reso1 = JSON.parse(JSON.stringify(job));
                            console.log(reso1);
                            if (job != null) {
                                reso.salary = reso1.salary;
                                reso.recruitername = reso1.recruitername;
                                if (job.deleted == false && job.number_application == job.number_applications_applied) {
                                    reso.stage = "Rejected";
                                }
                                else if (job.deleted == true) {
                                    reso.stage = "Deleted";
                                }
                            }

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


applicantRouter.route('/rate')
    .post(restrictAccess((req, res, result) => {
        Applications.findById(req.body.appid)
            .then((application) => {
                if (application.rated == true) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ err: "Already rated" });
                }
                else {
                    Jobs.findById(application.jobid)
                        .then((job) => {
                            // console.log(req.body.rating);
                            var tot = parseInt(job.totrating);
                            var num = job.number_rated;
                            var sum = parseInt(req.body.rating);
                            sum += tot;
                            // console.log(typeof req.body.rating + " " + num + " " + sum);
                            job.totrating = sum;
                            job.number_rated = (num + 1);
                            var k = sum / (num + 1);
                            job.rating = k;
                            // console.log(k);
                            application.rated = true;
                            application.save().then((napp) => {
                                job.save().then((njob) => {
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


module.exports = applicantRouter;