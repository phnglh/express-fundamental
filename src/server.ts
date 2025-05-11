import dotenv from "dotenv";
dotenv.config();

// import App
import app from "./app";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
  console.log(
    `API Documentation is available at http://${HOST}:${PORT}/api/docs`,
  );
});

// Handle graceful shutdown
const shutdown = () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  shutdown();
});

process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection:", reason);
  shutdown();
});
