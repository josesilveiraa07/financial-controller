import { Provider } from '@nestjs/common';
import { GetUserTotalIncomeUseCase } from 'src/application/usecases';
import { IncomesRepository } from 'src/infrastructure/repositories';

export const GetUserTotalIncomeUseCaseProvider: Provider = {
  provide: GetUserTotalIncomeUseCase,
  inject: [IncomesRepository],
  useFactory: (incomesRepository: IncomesRepository) => {
    return new GetUserTotalIncomeUseCase(incomesRepository);
  },
};
