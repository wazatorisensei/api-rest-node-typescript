import { RequestHandler } from 'express';

import { Schema } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;

type TAllSchemas = Record<TProperty, Schema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export { TValidation, TProperty };
