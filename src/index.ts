import { server } from './server/Server';

import { Knex } from './server/database/knex';

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`App running on http://localhost:${process.env.PORT || 3333}`);
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  // rodar migration em produção
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  // rodar migration manualmente
  startServer();
}
