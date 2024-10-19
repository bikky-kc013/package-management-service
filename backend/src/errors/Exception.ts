class Exception extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);

    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (this.isOperational) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends Exception {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

class BadRequestError extends Exception {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

class UnauthorizedError extends Exception {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends Exception {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}

class InternalServerError extends Exception {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}

export {
  Exception,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
};
