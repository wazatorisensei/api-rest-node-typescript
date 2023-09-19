import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { string, number, object } from 'yup';

import { IQueryProps } from '../../interfaces';

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
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  console.log(req.query);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Not implemented !');
};
