import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from './../../shared/middleware';

import { object, number } from 'yup';

import { IParamProps } from '../../interfaces';

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    object().shape({
      id: number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Register not found !' },
    });
  return res.status(StatusCodes.NO_CONTENT).send();
};
