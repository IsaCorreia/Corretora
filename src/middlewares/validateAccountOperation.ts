import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status-codes";
import Joi from "joi";
import HttpException from "../utils/HttpException";

const schema = Joi.object({
  CodCliente: Joi.number().required(),
  Valor: Joi.number().min(0).required(),
});

export default function validateAccountOperation(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { error } = schema.validate(req.body);
  if (error !== undefined)
    throw new HttpException(BAD_REQUEST, error.details[0].message);
  next();
}
