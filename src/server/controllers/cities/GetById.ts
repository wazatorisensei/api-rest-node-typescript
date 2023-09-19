import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from './../../shared/middleware';

import { object, number } from 'yup';

import { IParamProps } from '../../interfaces';

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    object().shape({
      id: number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implement !');
};
