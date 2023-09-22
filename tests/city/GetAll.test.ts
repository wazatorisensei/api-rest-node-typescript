import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('City - GetAll', () => {
  it('Get all registry', async () => {
    const response = await testServer.post('/cities').send({
      name: 'Rio de Janeiro',
    });

    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    const responseSearchAll = await testServer.get('/city').send();

    expect(Number(responseSearchAll.header['x-total-count'])).toBeGreaterThan(
      0
    );
    expect(responseSearchAll.statusCode).toEqual(StatusCodes.OK);
    expect(responseSearchAll.body.length).toBeGreaterThan(0);
  });
});
