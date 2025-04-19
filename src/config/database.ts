import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logger: 'advanced-console',
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  extra: {
    connectionLimit: 10,
  },
  migrationsRun: true,
  migrationsTransactionMode: 'all',
  cache: {
    duration: 60000, 
  },
  maxQueryExecutionTime: 1000, 
  // replication: {
  //   master: {
  //     host: process.env.DB_MASTER_HOST,
  //     port: Number(process.env.DB_MASTER_PORT),
  //     username: process.env.DB_MASTER_USERNAME,
  //     password: process.env.DB_MASTER_PASSWORD,
  //     database: process.env.DB_MASTER_NAME,
  //   },
  //   slaves: [
  //     {
  //       host: process.env.DB_SLAVE_HOST,
  //       port: Number(process.env.DB_SLAVE_PORT),
  //       username: process.env.DB_SLAVE_USERNAME,
  //       password: process.env.DB_SLAVE_PASSWORD,
  //       database: process.env.DB_SLAVE_NAME,
  //     },
  //   ],
  // },
})

export default AppDataSource;
