import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('City - GetById', () => {
  it('Get registry peer id', async () => {
    const response = await testServer.post('/city').send({
      name: 'Rio de Janeiro',
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseById = await testServer.get(`/city/${response.body}`).send();

    expect(responseById.statusCode).toEqual(StatusCodes.OK);
    expect(responseById.body).toHaveProperty('name');
  });

  it("Try to get by id the record that doesn't exist", async () => {
    const response = await testServer.delete('/city/99999').send();
    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
