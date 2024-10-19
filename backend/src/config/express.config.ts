import express, { Express, json } from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "../utils/errorHandler";
import routes from "../routes";

const buildExpressServer = (app: Express) => {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*",
    })
  );
  app.disable("x-powered-by");
  app.use(express.json({ limit: "5mb" }));
  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 100000,
    })
  );
  routes(app);
  app.use(errorHandler());
  const PORT = process.env.PORT || "4400";
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

export { buildExpressServer };
