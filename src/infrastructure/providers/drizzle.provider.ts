import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DrizzleProvider: Provider = {
  provide: 'DRIZZLE_CONNECTION',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return drizzle(configService.get<string>('DATABASE_URL') as string);
  },
};
