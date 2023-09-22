import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { object, number, string } from 'yup';

import { IBodyProps, IParamProps } from '../../types-interface';

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
  if (Number(req.params.id) === 99999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: 'Register not found !' },
    });
  return res.status(StatusCodes.NO_CONTENT).send();
};