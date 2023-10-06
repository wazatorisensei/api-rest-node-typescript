import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CityProvider } from '../../database/providers/city';

export const getHeaders = async (_req: Request, res: Response) => {
  const result = CityProvider.handleRequestHeaders();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (result === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: 'Head not found',
      },
    });
  }

  res.setHeader('X-Powered-By', 'By-Wazatori');

  return res.status(StatusCodes.CREATED).json(result);
};
