import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = () => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (err instanceof ZodError) {
      const formattedErrors = err.errors.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));
      res.status(400).json({ success: false, errors: formattedErrors });
    } else if (err.errors && Array.isArray(err.errors)) {
      const formattedErrors = err.errors.map((error: any) => ({
        field: error.path[0],
        message: error.message,
      }));
      res.status(400).json({ success: false, errors: formattedErrors });
    } else {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
  };
};

export default errorHandler;
