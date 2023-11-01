import Trainer from '../../../src/entities/Trainer';
import { ITrainer } from '../../../src/interfaces/trainer';

describe('Trainer model', () => {
  describe('Trainer validation', () => {
    let newTrainer: ITrainer;

    beforeEach(() => {
      newTrainer = {
        name: 'Ash Ketchum',
        nickname: 'The golden boy',
        email: 'goldenboy@mailinator.com',
        password: '1234567890',
        team: 'red'
      };
    });

    it('should be correctly validate a valid user', async () => {
      await expect(new Trainer(newTrainer).validate()).resolves.toBeUndefined();
    });

    it('should be throw a validation error if email is invalid', async () => {
      newTrainer.email = 'invalidEmail';
      await expect(new Trainer(newTrainer).validate()).rejects.toThrow();
    });
  });
});
