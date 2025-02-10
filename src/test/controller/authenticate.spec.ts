import "dotenv/config";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { authenticate, authorization } from "../../controller/authenticate";
import {
  unauthenticatedError,
  unauthorizedError,
} from "../../controller/globalError";
import User from "../../model/user.model";
import { populate } from "dotenv";

jest.mock("../../model/user.model");

const mockedUser = jest.mocked(User);

describe("Authenticate middleware", () => {
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {},
    };

    res = { status: jest.fn() };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("authenticate", () => {
    it("Should return error if token not found in header", async () => {
      authenticate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(unauthenticatedError());
    });

    it("Should return error if bearer not added to token", async () => {
      req.headers!.authorization = "token";

      authenticate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(unauthenticatedError());
    });

    it("Should return error if jwt encountered error", async () => {
      req.headers!.authorization = "Bearer token";

      jest.spyOn(jwt, "verify").mockResolvedValue(null as never);

      await authenticate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(unauthenticatedError());
    });

    it("Should add user to request", async () => {
      req.headers!.authorization = "Bearer token";

      jest.spyOn(jwt, "verify").mockResolvedValue({ user: "user-id" } as never);

      await authenticate(req as Request, res as Response, next);

      expect(req.user).toBe("user-id");
      expect(next).toHaveBeenCalledWith();
    });

    it("Should return error in catch{}", async () => {
      req.headers!.authorization = "Bearer token";
      const error = new Error("Jwt encountered error");

      jest.spyOn(jwt, "verify").mockRejectedValueOnce(error as never);

      await authenticate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("authorize", () => {
    //   const sut = auth
    it("Should return error if user not found", async () => {
      mockedUser.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null),
      }));

      await authorization(["admin"])(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(unauthorizedError());
    });

    it("Should grant user admin priviledge", async () => {
      const mockUser = {
        id: "admin-id",
        roles: [{ name: "admin" }, { name: "superadmin" }],
      };

      mockedUser.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValueOnce(mockUser),
      }));

      await authorization(["admin"])(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });

    it("Should return error if user access forbidden router", async () => {
      const mockUser = { id: "user-id", roles: [{ name: "user" }] };

      mockedUser.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockResolvedValueOnce(mockUser),
      }));

      await authorization(["admin"])(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(unauthorizedError());
    });

    it("Should return error if error encountered", async () => {
      const error = new Error("Db sync error");

      mockedUser.findById = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockRejectedValueOnce(error),
      }));

      await authorization(["admin"])(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
