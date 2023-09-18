import { Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { ICities } from './../../interfaces';

const bodyValidation: yup.Schema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

interface IFilter {
  filter?: string;
}

const queryValidation: yup.Schema<IFilter> = yup.object().shape({
  filter: yup.string().required().min(3),
});

// middleware
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: errors || yupError.message,
      },
    });
  }
};

export const createQueryValidator: RequestHandler = async (req, res, next) => {
  try {
    await queryValidation.validate(req.query, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: errors || yupError.message,
      },
    });
  }
};

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.OK).send('Citie created !');
};
