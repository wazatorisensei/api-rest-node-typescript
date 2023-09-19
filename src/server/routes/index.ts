import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CitiesController } from './../controllers';
import { WellController } from '../controllers/well';

const router = Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Server is running !');
});

router.get(
  '/cities',
  CitiesController.getAllValidation,
  CitiesController.getAll
);

router.get(
  '/cities/:id',
  CitiesController.getByIdValidation,
  CitiesController.getById
);

router.put(
  '/cities/:id',
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);

router.delete(
  '/cities/:id',
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

router.post(
  '/cities',
  CitiesController.createValidation,
  CitiesController.create
);

router.post(
  '/overview',
  WellController.createValidation,
  WellController.create
);

export { router };
