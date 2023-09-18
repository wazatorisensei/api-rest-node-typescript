import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadesController } from './../controllers';

const router = Router();

interface Teste {}

router.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Olá, DEV!');
});

router.post('/cidades', CidadesController.create);

export { router };
