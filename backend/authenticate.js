var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var config = require("./config")

var Applicant = require("./models/applicant");
var Recruiter = require("./models/recruiter");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Applicant.findOne({ _id: jwt_payload.id }
                .then(applicant => {
                    if (aplicant) {
                        return done(null, applicant);
                    }
                })
                .catch(err => console.log(err)));
            Recruiter.findOne({ _id: jwt_payload.id }
                .then(recruiter => {
                    if (recruiter) {
                        return done(null, recruiter);
                    }
                })
                .catch(err => console.log(err)));
            return done(null, false)
        })
    );
};