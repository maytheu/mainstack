import "dotenv/config";
import { createServer } from "http";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./route";
import AppError from "./config/AppError";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";

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
    this.app.use(hpp());
  }

  private route() {
    this.app.get("/", (req: Request, res: Response) =>
      res.redirect("https://documenter.getpostman.com/view/8279131/2sA3dxDreT")
    );
    this.app.use("/api/v1", router);
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError(`Ooops.. ${req.originalUrl} not found on this server`, 404)
      );
    });
  }

  private errorHandler() {
  //  this.app.use(globalError);
  }
}

export default new App();
