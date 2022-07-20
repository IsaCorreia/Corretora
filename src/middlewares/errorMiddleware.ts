import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  const { status, message } = err as HttpException;
  return res.status(status || 500).send( message || 'Algo deu errado. Tente novamente mais tarde.');
}
