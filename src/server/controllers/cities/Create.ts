import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { ICities, IFilter } from '../../interfaces';

import { string, object } from 'yup';

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(
    object().shape({
      name: string().required().min(3),
      state: string().required().min(3),
    })
  ),
  query: getSchema<IFilter>(
    object().shape({
      filter: string().optional().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.OK).send('Citie created !');
};
