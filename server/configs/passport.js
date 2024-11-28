const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const passport = require("passport");
const User = require("../modals/user.model");
const { v4: uuidv4 } = require("uuid");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3333/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      
      const { given_name, family_name, email } = profile?._json;

      let user = await User.findOne({ email: profile._json.email })
        .lean()
        .exec();

      async function generateCustomId() {
        const latestUser = await User.findOne().sort({ id: -1 });
        const latestId = latestUser ? latestUser.id : 0;
        return latestId + 1 || 1;
      }

      const payload = {
        firstname: given_name,
        lastname: family_name,
        email: email,
        password: uuidv4(),
        id: await generateCustomId(),
      };

      if (!user) {
        user = await User.create(payload);
        console.log(user, "created");
      }

      console.log(user, "exist");

      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, user);
      //   });
    }
  )
);

module.exports = passport;
