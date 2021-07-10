var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("../config")

// load input validation
// var validateRegisterApplicantInput = require("../validation/register-applicant")
// var validateRegisterRecruiterInput = require("../validation/register-recruiter")
// var validateLoginInput = require("../validation/login");

var Applicant = require("../models/applicant")
var Recruiter = require("../models/recruiter")


// applicant registration route
// @route POST auth/register/applicant
// @desc Register applicant
// @access Public
router.post("/register", (req, res, next) => {

  // check input validation
  console.log(req);
  // var { errors, isValid } = validateRegisterApplicantInput(req.body);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  // check already exists and if not, create
  type = req.body.type;
  if (type.localeCompare("Applicant") == 0) {
    Applicant.findOne({ email: req.body.email }).then((applicant) => {
      if (applicant) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: "Email Id already exists !" });
        return res;
      } else {
        Recruiter.findOne({
          email: req.body.email
        }).then(recruiter => {
          if (recruiter) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: "Email Id already registered as a Recruiter !" });
            return;
          } else {
            var newApplicant = new Applicant(req.body);
            console.log(newApplicant);
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newApplicant.password, salt, (err, hash) => {
                if (err) {
                  return next(err);
                }
                else if (!err) {
                  newApplicant.password = hash;
                  newApplicant.number_application = 0;
                  newApplicant
                    .save()
                    .then((applicant) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(applicant)
                    })
                    .catch(err => next(err));
                }
              });
            });
          }
        })
          .catch(err => next(err));
      }
    })
      .catch(err => next(err));
  }
  else {
    Recruiter.findOne({
      email: req.body.email
    }).then(recruiter => {
      if (recruiter) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.json({ error: "Email Id already exists !" });
        return;
      } else {
        Applicant.findOne({ email: req.body.email }).then((applicant) => {
          if (applicant) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: "Email Id already registered as an Applicant !" });
            return res;
          }
          else {
            var newRecruiter = new Recruiter(req.body);
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newRecruiter.password, salt, (err, hash) => {
                if (err) {
                  err = new Error(err);
                  err.status = 404;
                  return next(err);
                }
                else if (!err) {
                  newRecruiter.password = hash;
                  newRecruiter
                    .save()
                    .then((applicant) => {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(applicant)
                    })
                    .catch(err => console.log(err));
                }
              });
            });
          }
        })
          .catch(err => next(err));
      }
    })
      .catch(err => next(err));
  }
});


router.post("/login", (req, res, next) => {
  // check validation
  // var { errors, isValid } = validateLoginInput(req.body);

  // if (!isValid) {
  //   res.statusCode = 400;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.json(errors);
  //   return;
  // }

  var email = req.body.email;
  var password = req.body.password;
  Applicant.findOne({ email: email }).then((applicant) => {
    if (applicant != null) {
      console.log(applicant);

      bcrypt.compare(password, applicant.password).then(correct_password => {
        if (correct_password == false) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.json({
            error: "Your password is incorrect"
          });
        }
        else if (correct_password == true) {
          var jwtPayload = {
            id: applicant.id,
            type: "Applicant",
            name: applicant.firstname + " " + applicant.lastname
          };
          jwt.sign(jwtPayload, config.secretKey, {
            expiresIn: 60000
          },
            (err, token) => {
              if (err == null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  success: true,
                  token: "Bearer " + token
                })
              }
            });
        }
      })
        .catch((err) => next(err));
    }
    else {
      Recruiter.findOne({ email: email })
        .then((recruiter) => {
          if (recruiter != null) {
            bcrypt.compare(password, recruiter.password).then(correct_password => {
              if (correct_password == false) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.json({
                  error: "Your password is incorrect"
                });
              }
              else if (correct_password == true) {
                var jwtPayload = {
                  id: recruiter.id,
                  type: "Recruiter",
                  name: recruiter.firstname + " " + recruiter.lastname
                };
                jwt.sign(jwtPayload, config.secretKey, {
                  expiresIn: 60000
                },
                  (err, token) => {
                    if (err == null) {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      })
                    }
                  });
              }
            })
              .catch((err) => next(err));
          }
          else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ error: "Email id not registered" });
          }
        })
        .catch((err) => next(err));
    }
  })
    .catch((err) => next(err));
});


module.exports = router