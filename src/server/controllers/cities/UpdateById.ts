import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from './../../shared/middleware';

import { object, number, string } from 'yup';

import { IBodyProps, IParamProps } from '../../interfaces';

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    object().shape({
      name: string().required().min(3),
    })
  ),
  params: getSchema<IParamProps>(
    object().shape({
      id: number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Not implement !');
};
