import express from 'express';
const server = express();
server.get('/', (_req, res) => {
  return res.send('Olá, DEV!');
});
export { server };
