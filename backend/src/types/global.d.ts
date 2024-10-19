import { QueryRunner } from "typeorm";

interface TokenPayload {
  sub: string;
  role: "user" | "admin";
}

interface Runner {
  runner: QueryRunner;
}

declare global {
  namespace Express {
    interface Request {
      tokenPayload: TokenPayload;
    }
  }
}
