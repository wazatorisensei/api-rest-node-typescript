import { ICities } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    city: ICity;
    // people: IPeople;
    // user: IUser;
  }
}
