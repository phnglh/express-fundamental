import express, { Application, Request, Response, NextFunction } from "express";
import "reflect-metadata";
import expressWinston from "express-winston";
import logger from "./utils/logger";
import AppDataSource from "./config/database";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import userRouter from "./routes/user.routes";
import { authRouter } from "./routes/auth";
import { seedRoles } from "./seeds/role.seed";

const app: Application = express();

// Setup middlewares
app.use(express.json());

// Logging all requests
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  }),
);

// API routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Swagger API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handler (nên đặt sau route)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({
    error: err.message,
  });
  next();
});

// Start DB + seed
AppDataSource.initialize()
  .then(async () => {
    logger.info("Database connection established");

    // Seed roles khi server chạy
    await seedRoles();
  })
  .catch((error) => {
    logger.error("Error during Data Source initialization", error);
  });

export default app;
