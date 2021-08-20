var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var { Users } = require('../models');

var options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    // eslint-disable-next-line camelcase
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await Users.findByPk(jwt_payload.sub);
        if (user == null) return done(null, false, { message: 'invalid token' });
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
