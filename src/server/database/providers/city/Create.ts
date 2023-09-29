import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';

export const create = async (
  city: Omit<ICity, 'id'>
): Promise<number | Error> => {
  try {
    // const [result1, result2, result3, result4] = await Knex(
    //   ETableNames.city
    // ).insert([city, city, city, city]);
    const [result] = await Knex(ETableNames.city).insert(city).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao cadastrar o registro' + typeof result);
  } catch (error) {
    // pesquisar bibliotecas de logs para colocar em um storage externo e monitorar a aplicação com logs
    console.log(error);
    console.error(error);
    return new Error('Erro ao cadastrar o registro:' + error);
  }
};
