"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mikro_orm_1 = require("mikro-orm");
const User_1 = require("./entities/User");
async function connector() {
    return mikro_orm_1.MikroORM.init({
        entities: [User_1.User],
        // entitiesDirs: ["./dist/entities"],
        // entitiesDirsTs: ["./package/entities"],
        type: "postgresql",
        clientUrl: "postgresql://doadmin:if34j1upg4expczp@type-dev-36-do-user-2011008-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
    });
}
exports.connector = connector;
