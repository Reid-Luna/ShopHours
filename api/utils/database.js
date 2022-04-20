import mongoose from "mongoose";

const STATE = {
  TIMEOUT: false,
  ERROR: false,
  connection: false,
};

export const init = () =>
  new Promise(async (r, j) => {
    while (!STATE.conenction) {
      while (!STATE.TIMEOUT) {
        try {
          console.log(
            "[DATABASE] connecting to mongodb",
            process.env.MONGO_URI
          );
          const con = await mongoose.connect(process.env.MONGO_URI);
          console.log("[DATABASE] connected to mongodb");
          STATE.connection = con;
          STATE.TIMEOUT = true;
          return r(con);
        } catch (e) {
          console.log("[DATABASE]", e, "trying again in 5...");
          STATE.TIMEOUT = setTimeout(() => (STATE.TIMEOUT = false), 5000);
        }
      }
    }
  });
