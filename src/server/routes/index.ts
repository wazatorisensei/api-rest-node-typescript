import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CitiesController } from './../controllers';

const router = Router();

interface Teste {}

router.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Server is running !');
});

router.post('/cities', CitiesController.create);

export { router };
