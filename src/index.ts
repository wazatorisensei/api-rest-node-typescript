import { server } from './server/Server';

import { Knex } from './server/database/knex';

export const reset = '\x1b[0m'; // reset before ❌
export const b = '\x1b[36m'; // blue to info 🔵
export const r = '\x1b[31m'; // red to fail 🔴
export const g = '\x1b[32m'; // green to aprove 🟢

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    try {
      console.log(
        `🟢 ➡️ [${g}API${reset}] running on http://localhost:${
          process.env.PORT || 3333
        } or http://127.0.0.1:${process.env.PORT || 3333}`
      );
    } catch (error) {
      console.error(
        `🔴 ➡️ ${r}[API]${reset} fail to running on http://localhost:${
          process.env.PORT || 3333
        } or http://127.0.0.1:${process.env.PORT || 3333}`
      );
    }
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  console.log('Running migrations !');
  // rodar migration em produção
  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  // rodar migration manualmente
  startServer();
}
