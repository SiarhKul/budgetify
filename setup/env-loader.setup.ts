import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
  debug: true,
  override: true,
});
