import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore, CacheStoreFactory } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => ({
        isGlobal: true,
        store: (<unknown>redisStore) as string | CacheStoreFactory | CacheStore,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
      }),
    }),
  ],
})
export class CachingProviderModule {}
