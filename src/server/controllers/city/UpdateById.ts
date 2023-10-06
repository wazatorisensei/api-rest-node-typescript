import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { object, number, string } from 'yup';

import { IBodyProps, IParamProps } from '../../types-interface';
import { CityProvider } from '../../database/providers/city';

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
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'The "id" parameter needs to be informed.',
      },
    });
  }

  const result = await CityProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.setHeader('X-Powered-By', 'By-Wazatori');

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
