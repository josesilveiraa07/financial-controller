import * as bcrypt from 'bcrypt';
import { CryptoInterface } from 'src/application/interfaces';

export class CryptoImpl implements CryptoInterface {
  hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
