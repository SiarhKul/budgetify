import { config, database, status, up } from 'migrate-mongo';
import * as migrateMongoConfig from 'migrate-mongo-config';
import type { Logger } from '@nestjs/common';

export async function runMigrations(logger: Logger) {
  config.set(migrateMongoConfig);

  const { db, client } = await database.connect();

  const mongoConnectionSettings = await config.read();

  logger.log(
    `Mongo Connection Settings from migrate-mongo-config.js: ${JSON.stringify(mongoConnectionSettings, null, 2)}`,
  );

  const migrated = await up(db, client);
  migrated.forEach((fileName) => logger.debug('Migrated:', fileName));

  const migrationStatus = await status(db);
  migrationStatus.forEach(({ fileName, appliedAt }) =>
    logger.log(`${fileName}: ${appliedAt}`),
  );

  await client.close();
}
