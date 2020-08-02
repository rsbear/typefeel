require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";

import { client } from "./node_modules/models/package";

// import refresh from "./routes/refresh";
// import login from "./routes/login";
// import signup from "./routes/signup";
// import generateSignupAuth from "./routes/generateSignupAuth";
// import generateLoginAuth from "./routes/generateLoginAuth";

const isDev = process.env.NODE !== "production";
void (async () => {
  const app: express.Application = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get("/", (_req, res) => {
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    res.send("hi");
  });

  const orm = await client();
  console.log("orm", orm);

  // app.post("/generateSignup", generateSignupAuth);

  // app.post("/generateLogin", generateLoginAuth);

  // app.post("/login", login);

  // app.post("/signup", signup);

  // app.post("/refresh", refresh);

  app.listen({ port: isDev ? 4001 : process.env.PORT }, () =>
    console.log("Auth server up - either 4001 or prod")
  );
})();
