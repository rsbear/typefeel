import "reflect-metadata";
import { MikroORM } from "mikro-orm";
import { User } from "./entities/User";

export async function connector() {
  return MikroORM.init({
    entities: [User],
    // entitiesDirs: ["./dist/entities"],
    // entitiesDirsTs: ["./package/entities"],
    type: "postgresql",
    clientUrl:
      "postgresql://doadmin:if34j1upg4expczp@type-dev-36-do-user-2011008-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require",
  });
}
