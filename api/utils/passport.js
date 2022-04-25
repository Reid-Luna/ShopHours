import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import lStrategy from "passport-local";
import { User } from "../models";

passport.use(
  "signup",
  new lStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log("trying to create user");
      try {
        const user = await User.create({ username, password });
        console.log("Created User", user);
        return done(null, user);
      } catch (error) {
        console.log("Signup error", error);
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new lStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new Strategy(
    {
      secretOrKey: "Secret69",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));
