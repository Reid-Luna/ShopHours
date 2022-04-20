import express from "express";
import cors from "cors";
import bp from "body-parser";
import passport from "passport";
import { PSetup, DotEnv, database, SM } from "./utils";
import { Search, User } from "./routes";

const { API_PORT } = process.env;

const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use("/user", User);
app.use("/search", passport.authenticate("jwt", { session: false }), Search);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const init = async () => {
  await database.init();
  SM.Auth();
  app.listen(API_PORT, () => console.log("API Listening", API_PORT));
};

init();
