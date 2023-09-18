import { StatusCodes } from 'http-status-codes';

import { ValidationError } from 'yup';

import { TValidation, TProperty } from '../../types';

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<TProperty | string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};
        yupError.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });
        errorsResult[key as TProperty] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };
