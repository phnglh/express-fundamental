import express, { Application, NextFunction, Request, Response } from "express";
import expressWinston from "express-winston";
import logger from "src/utils/logger";
const app: Application = express();
const PORT = 3056;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
