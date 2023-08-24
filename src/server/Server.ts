import express from 'express';
const server = express();
interface Teste {}
server.get('/', (_req, res) => {
  return res.send('Olá, DEV!');
});
export { server };
