import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './src/common/config';

export const ConfigDB: ConnectionOptions = {
  type: 'postgres',
  host: 'host.docker.internal',
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT) : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
};
