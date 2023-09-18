import { string, object } from 'yup';

import { validation } from '../../shared/middleware';

import { ICities, IFilter } from './../../interfaces';

const createValidation = validation((getSchema) => ({
  body: getSchema<ICities>(
    object().shape({
      name: string().required().min(3),
      state: string().required().min(3),
    })
  ),
  query: getSchema<IFilter>(
    object().shape({
      filter: string().required().min(3),
    })
  ),
}));

export { createValidation };
