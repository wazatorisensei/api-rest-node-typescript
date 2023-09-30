import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { string, number, object } from 'yup';

import { IQueryProps } from '../../types-interface';

import { CityProvider } from '../../database/providers/city';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    object().shape({
      page: number().optional().moreThan(0),
      limit: number().optional().moreThan(0),
      id: number().integer().optional().default(0),
      filter: string().optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await CityProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.id)
  );

  const count = await CityProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');

  res.setHeader('x-total-count', count);

  return res.status(StatusCodes.OK).json(result);
};
