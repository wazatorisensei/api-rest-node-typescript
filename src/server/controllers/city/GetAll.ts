import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { string, number, object } from 'yup';

import { IQueryProps } from '../../types-interface';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    object().shape({
      page: number().optional().moreThan(0),
      limit: number().optional().moreThan(0),
      filter: string().optional(),
    })
  ),
}));

export const getAll = async (
  _req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      name: 'Rio de Janeiro',
    },
  ]);
};
