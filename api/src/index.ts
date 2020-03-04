import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { ConnectionOptions, createConnection } from "typeorm";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./tokenGenerators";
import { sendRefreshToken } from "./sendRefreshToken";
import * as entities from "./entity";
import { values } from "lodash";

import { UserResolvers } from "./resolvers/UserResolvers";
import { AuthResolvers } from "./resolvers/AuthResolvers";
import { KeyboardResolvers } from "./resolvers/KeyboardResolvers";
import { KeysetResolvers } from "./resolvers/KeysetResolvers";
import { EditionResolvers } from "./resolvers/EditionResolvers";
import { VoteResolvers } from "./resolvers/VoteResolvers";
import { JoinKeyboardResolver } from "./resolvers/JoinKeyboardResolver";
import { JoinKeysetResolver } from "./resolvers/JoinKeysetResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { FollowResolvers } from "./resolvers/FollowResolvers";
import { seeder } from "./data";


const prod = process.env.NODE_ENV === 'production'
const origin = !prod ? "http://localhost:3000" : "https://typefeel.com";

(async () => {
  const app = express();
  app.use(
    cors({
      origin: origin,
      credentials: true
    })
  );
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("check 1 2"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.typefeel_sesh;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });


  const dbConfig: ConnectionOptions = {
    type: "postgres",
    entities: values(entities),
    host: !prod ? 'localhost' : process.env.TYPEORM_HOST,
    username: !prod ? 'typefeel' : process.env.TYPEORM_USERNAME,
    password: !prod ? 'typefeel' : process.env.TYPEORM_PASSWORD,
    database: !prod ? 'type-db' : process.env.TYPEORM_DATABASE,
    port: !prod ? 5432 : 25060 || 5432,
    extra: {
      ssl: !prod ? false : true
    },
    synchronize: true,
    logging: false,
    logger: "file"
  };

  await createConnection(dbConfig).catch((error: any) => {
    console.log(error);
  });

  const users = await User.find()
  if (!prod && users.length === 0) {
    await seeder()
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        AuthResolvers,
        KeyboardResolvers,
        KeysetResolvers,
        UserResolvers,
        EditionResolvers,
        VoteResolvers,
        JoinKeyboardResolver,
        JoinKeysetResolver,
        PostResolver,
        FollowResolvers
      ]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(
    { port: !prod ? 4000 : process.env.PORT },
    () => {
      console.log("🚀 ------ UP UP AND AWAY");
      console.log(
        !prod ? "In development mode" : "Production deployment"
      );
    }
  );
})();
