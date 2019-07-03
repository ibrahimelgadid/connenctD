const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const secret = require('./exports').secretOrKey;
const passport =require('passport')



var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports= (passport)=>{
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                return done(null, user);

            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}

