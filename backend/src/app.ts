import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { buildExpressServer } from "./config/express.config";

(function bootstrap() {
  try {
    const app = express();
    buildExpressServer(app);
  } catch (error) {
    console.log(error);
  }
})();
