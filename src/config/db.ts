import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

const dbClient = new Client({
  connectionString: DATABASE_URL
});

dbClient.on('error', (err: Error) => {
  console.info({
    message: `Postgres client: Unexpected error on idle client`,
    extra: err,
  });

  process.exit(1);
});

const init = async () => {
  await dbClient.connect();
  console.info({
    message: `Postgres client connected`,
  });
};

export { init, dbClient };
