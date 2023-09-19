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
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Register not found !' },
    });
  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    name: 'Rio de Janeiro',
  });
};
