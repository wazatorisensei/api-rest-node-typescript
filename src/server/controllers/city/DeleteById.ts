import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { object, number } from 'yup';

import { IParamProps } from '../../types-interface';

import { CityProvider } from '../../database/providers/city';

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    object().shape({
      id: number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: 'The "id" parameter needs to be informed.' },
    });
  }

  const result = await CityProvider.deleteById(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  res.setHeader('X-Powered-By', 'By-Wazatori');

  return res.status(StatusCodes.NO_CONTENT).send();
};
