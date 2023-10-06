import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';

import { string, number, object } from 'yup';

import { IQueryProps } from '../../types-interface';

import { CityProvider } from '../../database/providers/city';

import { CSRFToken, UUIDV4 } from '../../shared/functions';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    object().shape({
      page: number().optional().moreThan(0),
      limit: number().optional().moreThan(0),
      id: number().integer().optional().default(0),
      filter: string().optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await CityProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.id)
  );

  const count = await CityProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: count.message,
      },
    });
  }

  const token = CSRFToken();

  const session = UUIDV4();

  const global = UUIDV4();

  res.cookie('X-Csrftoken', token, {
    // domain: 'localhost',
    // path: '/',
    // size: '',
    // sameSite: 'strict',
    expires: new Date(Date.now() + 24 * 3600000), // 1 day
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
    encode: (e) => e,
    signed: false,
  });

  res.setHeader('Access-Control-Expose-Headers', [
    'X-Total-Count',
    'X-Csrftoken',
    'Global-Session-Id',
    'Session-Id',
    'Content-Type',
  ]);

  res.setHeader('Access-Control-Request-Method', ['GET']);

  res.setHeader('X-Powered-By', 'By-Wazatori');

  res.setHeader('Connection', 'Keep-Alive');

  // res.setHeader('Date', '');

  // res.setHeader('Etag', '');

  res.setHeader('Content-Type', 'application/json');

  res.setHeader('Keep-Alive', `timeout=${100}`);

  res.setHeader('X-Total-Count', count);

  res.setHeader('X-Csrftoken', `csrftoken=${token}`);

  res.setHeader('Global-Session-Id', `globalsessionid=${global}`);

  res.setHeader('Session-Id', `sessionid=${session}`);

  return res.status(StatusCodes.OK).json(result);
  // return res
  //   .status(StatusCodes.CREATED)
  //   .json({ result, dataToStore: { key: 'teste', value: 'teste' } }); // set localstorage só pode ser feito via client-side
};
