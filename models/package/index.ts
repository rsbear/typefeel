import "reflect-metadata";
import { MikroORM } from "mikro-orm";
import { User } from "./entities/User";

export async function connector() {
  return MikroORM.init({
    entities: [User],
    // entitiesDirs: ["./dist/entities"],
    // entitiesDirsTs: ["./package/entities"],
    type: "postgresql",
    clientUrl: "",
  });
}
