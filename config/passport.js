const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const User = require("../models/User");

passport.serializeUser(function (user, done) {
  done(null, user.id);
}); //            │
//                │
//                │
//                └─────────────────┬──→ saved to session
//                                  │    req.session.passport.user = {id: '..'}
//                                  │
//                                  ↓
passport.deserializeUser(async function (id, done) {
  //            ┌─────────------────┘
  //            │
  //            ↓
  await User.findById(id, function (err, user) {
    done(err, user);
  }); //        └──────────────→ user object attaches to the request as req.user
});

const strategy = new LocalStrategy(async function verify(
  username,
  password,
  cb
) {
  try {
    /* 
   -----------------------------------------------------------------------------------------------------
    FIRST - CHECK THE USER 
    =======================
    1. Query the database with the provided username to check if the user already exists.
    2. If an error occurs, return cb with the error
    3. If the user comes back null, return cb including a message that Username or Password is incorrect
    4. Otherwise, continue on 
   -----------------------------------------------------------------------------------------------------
   */

    const user = await User.findOne(
      { username: username },
      function (err, user) {
        if (err) return cb(err);
        if (!user) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        /* 
   -----------------------------------------------------------------------------------------------------
    THEN - CHECK THE PASSWORD
    ==========================
    1. Hash the provided plaintext password using the user's salt, generated upon intial user register
    2. The hashed password is provided to the callback
    3. If there is an err, return cb(err)
    4. If the hashedPassword and the user's actual hashed password DO NOT match, 
       return cb including a message that Username or Password is incorrect
    5. Otherwise, the passwords match, return the authenticated user
   -----------------------------------------------------------------------------------------------------
   */

        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          (err, hashedPassword) => {
            if (err) {
              return cb(err);
            }
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }

            return cb(null, user);
          }
        );
      }
    ).clone();
  } catch (err) {
    console.log(err);
  }
});

passport.use(strategy);

module.exports = passport;
