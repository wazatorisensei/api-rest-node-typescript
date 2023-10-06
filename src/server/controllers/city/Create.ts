import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { IBodyProps } from '../../types-interface';

import { string, object } from 'yup';

import { ICity } from '../../database/models';

import { CityProvider } from '../../database/providers/city';

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    object().shape({
      name: string().required().min(3).max(150),
    })
  ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const result = await CityProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  res.setHeader('X-Powered-By', 'By-Wazatori');

  return res.status(StatusCodes.CREATED).json(result);
};
