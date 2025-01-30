import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./route";
import AppError from "./config/AppError";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import globalError from "./controller/globalError";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

class App {
  app: Application;

  constructor() {
    this.app = express();

    this.middleware();
    this.route();
    this.errorHandler();
  }

  private middleware() {
    const limiter = rateLimit({
      windowMs: 100 * 60 * 1000,
      max: 500,
      message: "Too many request",
    });
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(limiter);
    this.app.use(express.json());
    this.app.use(ExpressMongoSanitize());
  }

  private route() {
    this.app.get("/", (req: Request, res: Response) =>
      res.send("You're live <a href='api/v1/docs'>docs</a>")
    );
    this.app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get("/api/v1/docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    this.app.use("/api/v1", router);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError(`Ooops.. ${req.originalUrl} not found on this server`, 404)
      );
    });
  }

  private errorHandler() {
    this.app.use(globalError);
  }
}

export default new App();
