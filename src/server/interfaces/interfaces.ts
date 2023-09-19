interface ICities {
  name: string;
}

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

export { ICities, IFilter, IQueryProps, IParamProps, IBodyProps };
