import 'dotenv/config';
import 'reflect-metadata'
import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken';
import { ConnectionOptions, createConnection } from 'typeorm';
import { User } from './entity/User'
import { createAccessToken, createRefreshToken } from './tokenGenerators'
import { sendRefreshToken } from './sendRefreshToken'
import * as entities from "./entity";
import { values } from 'lodash'

import { UserResolvers } from './resolvers/UserResolvers'
import { AuthResolvers } from './resolvers/AuthResolvers'
import { KeyboardResolvers } from './resolvers/KeyboardResolvers'
import { KeysetResolvers } from './resolvers/KeysetResolvers'
import { EditionResolvers } from './resolvers/EditionResolvers';
import { VoteResolvers } from './resolvers/VoteResolvers';
import { JoinKeyboardResolver } from './resolvers/JoinKeyboardResolver';
import { JoinKeysetResolver } from './resolvers/JoinKeysetResolver';
import { PostResolver } from './resolvers/PostResolver';
import { FollowResolvers } from './resolvers/FollowResolvers';



(async () => {
  const app = express()
  app.use(cors({
    origin: process.env.NODE_ENV !== "production" ? 'http://localhost:3000' : 'https://typefeel.com',
    credentials: true
  }))
  app.use(cookieParser())
  app.get("/", (_req, res) => res.send("check 1 2"))
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.rfs
    if (!token) {
      return res.send({ ok: false, accessToken: "" })
    }

    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (err) {
      console.log(err)
      return res.send({ ok: false, accessToken: "" })
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  })

  const dbConfig: ConnectionOptions = {
    type: "postgres",
    entities: values(entities),
    // ...(process.env.DB_URL
    //   ? {
    //     url: process.env.DB_URL,
    //   }
    //   : {

    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME || "doadmin",
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE || "defaultdb",
    port: 25060 || 5432,
    extra: {
      ssl: true
    },

    // }),
    synchronize: true,
    logging: false,
    logger: "file",
  };



  await createConnection(dbConfig)
    .then(() => {
      console.log("connected to db")
      console.log(process.env.DB_URL)
    })
    .catch((error: any) => {
      console.log(error)
    })

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
        FollowResolvers,
      ]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // const PORT = process.env.NODE_ENV !== "production" ? 4000 : 5000

  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log('🚀 ------ UP UP AND AWAY')
    console.log(process.env.NODE_ENV !== 'production' ? "In development mode" : "Production deployment")
    console.log(process.env.DB_URL)
  })
})();

