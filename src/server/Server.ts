import express from 'express';
const server = express();
interface Teste {}
server.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});
export { server };
