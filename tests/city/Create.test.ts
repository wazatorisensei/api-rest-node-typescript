import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('City - Create', () => {
  it('Registry create', async () => {
    const response = await testServer.post('/city').send({
      name: 'Rio de Janeiro',
    });
    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

  it('Cannot create a record with a name that is too short', async () => {
    const response = await testServer.post('/city').send({
      name: 'RJ',
    });
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.name');
  });
});
