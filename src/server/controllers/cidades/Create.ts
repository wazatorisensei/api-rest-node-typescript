import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ICidade {
  nome: string;
}

export const create = (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body.nome);

  return res.status(StatusCodes.OK).send('Create !');
};
