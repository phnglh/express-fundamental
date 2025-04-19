import express, { Application, Request, Response, NextFunction } from "express";
import expressWinston from "express-winston";
import logger from "./utils/logger";
const app: Application = express();

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  }),
);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    msg: "Hello world",
  });
});


export default app;
