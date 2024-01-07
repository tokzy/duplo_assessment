import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: false,
          logging: true,
          synchronize: true,
          /*ssl: {
            rejectUnauthorized: false, // Set to true for production or when you want to verify the SSL certificate
            //ca: fs.readFileSync('./src/database/ca-certificate.crt'), // Path to your CA certificate file
          },*/
        };
      },
    }),
  ],
})
export class DatabaseModule {}
