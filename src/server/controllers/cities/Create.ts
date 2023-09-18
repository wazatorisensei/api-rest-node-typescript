import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ICities {
  name: string;
}

export const create = (req: Request<{}, {}, ICities>, res: Response) => {
  console.log(req.body.name);

  return res.status(StatusCodes.OK).send('Create !');
};
