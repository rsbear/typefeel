"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bodyParser = __importStar(require("body-parser"));
const dist_1 = __importDefault(require("./node_modules/models/dist/"));
// import refresh from "./routes/refresh";
// import login from "./routes/login";
// import signup from "./routes/signup";
// import generateSignupAuth from "./routes/generateSignupAuth";
// import generateLoginAuth from "./routes/generateLoginAuth";
const isDev = process.env.NODE !== "production";
void (async () => {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(cookie_parser_1.default());
    app.get("/", (_req, res) => {
        console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        res.send("hi");
    });
    const orm = await dist_1.default();
    console.log("orm", orm);
    // app.post("/generateSignup", generateSignupAuth);
    // app.post("/generateLogin", generateLoginAuth);
    // app.post("/login", login);
    // app.post("/signup", signup);
    // app.post("/refresh", refresh);
    app.listen({ port: isDev ? 4001 : process.env.PORT }, () => console.log("Auth server up - either 4001 or prod"));
})();
