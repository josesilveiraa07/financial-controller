import { Provider } from '@nestjs/common';
import { CryptoImpl } from 'src/infrastructure/crypto';

export const CryptoProvider: Provider = {
  provide: CryptoImpl,
  useFactory: () => {
    return new CryptoImpl();
  },
};
