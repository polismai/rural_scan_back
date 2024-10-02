import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot();

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  ssl:
    configService.get<string>('ENVIRONMENT') === 'development'
      ? false
      : {
          rejectUnauthorized: false,
        },
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  // retryDelay: 3000,
  // retryAttempts: 10,
};

export const AppDS = new DataSource(DataSourceConfig);

// dotenv.config();

// const config = {
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   ssl:
//     process.env.ENVIRONMENT === 'development'
//       ? false
//       : {
//           rejectUnauthorized: false,
//         },
//   synchronize: true,
//   logging: false,
//   autoLoadEntities: true,
//   retryDelay: 3000,
//   retryAttempts: 10,
// };

// export default registerAs('typeorm', () => config);

// export const connectionSource = new DataSource(config as DataSourceOptions);
