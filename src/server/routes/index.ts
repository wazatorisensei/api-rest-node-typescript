import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CityController } from './../controllers';
import { WellController } from '../controllers/well';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Server is running !');
});

router.get('/city', CityController.getAllValidation, CityController.getAll);

router.get(
  '/city/:id',
  CityController.getByIdValidation,
  CityController.getById
);

router.put(
  '/city/:id',
  CityController.updateByIdValidation,
  CityController.updateById
);

router.delete(
  '/city/:id',
  CityController.deleteByIdValidation,
  CityController.deleteById
);

router.post('/city', CityController.createValidation, CityController.create);

router.head('/city', (req, res) => CityController.getHeaders(req, res));

router.post(
  '/overview',
  WellController.createValidation,
  WellController.create
);

export { router };
