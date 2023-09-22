import { ICity } from '../database/models';

interface IBodyProps extends Omit<ICity, 'id'> {} // Omit<ICity, 'id' | 'name'> => para omitir o name

interface IFilter {
  filter?: string;
}

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

interface IParamProps {
  id?: number;
}

interface IBodyProps {
  name: string;
}

export { IBodyProps, IFilter, IQueryProps, IParamProps };
