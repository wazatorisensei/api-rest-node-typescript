import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { IBodyProps } from '../../types-interface';

import { string, object } from 'yup';

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    object().shape({
      name: string().required().min(3),
    })
  ),
}));

export const create = async (
  _req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  return res.status(StatusCodes.CREATED).json(1);
};
