import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - UpdateById', () => {
  it('Update registry peer id', async () => {
    const response = await testServer.post('/cities').send({
      name: 'Rio de Janeiro',
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseUpdated = await testServer
      .delete(`/cities/${response.body}`)
      .send({ name: 'Rio de' });

    expect(responseUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Try to update the record that doesn't exist", async () => {
    const response = await testServer.delete('/cities/99999').send();
    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});