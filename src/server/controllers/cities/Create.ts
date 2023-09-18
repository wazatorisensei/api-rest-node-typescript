import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { ICities } from './../../interfaces';

const bodyValidation: yup.Schema<ICities> = yup.object().shape({
  name: yup.string().required().min(3),
  state: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICities>, res: Response) => {
  let validateData: ICities | undefined = undefined;

  try {
    validateData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;
    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }

  console.log(validateData);

  return res.status(StatusCodes.OK).send('Citie created !');
};
