import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: +configService.get<string>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
            /*tls: {
              rejectUnauthorized: true,
            },*/
          },
        };
      },
    }),
  ],
})
export class QueueConfigModule {}
