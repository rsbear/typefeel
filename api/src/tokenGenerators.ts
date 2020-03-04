import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

console.log(process.env.ACCESS_TOKEN_SECRET!)
console.log(process.env.REFRESH_TOKEN_SECRET!)
export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
