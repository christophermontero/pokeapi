import { faker } from '@faker-js/faker';
import Trainer from '../../../src/entities/Trainer';
import { ITrainer } from '../../../src/interfaces/trainer';

describe('Trainer model', () => {
  describe('Trainer validation', () => {
    let newTrainer: ITrainer;

    beforeEach(() => {
      newTrainer = {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: 'Test*2023',
        team: 'red'
      };
    });

    it('should correctly validate a valid user', async () => {
      await expect(new Trainer(newTrainer).validate()).resolves.toBeUndefined();
    });

    it('should throw a validation error if email is invalid', async () => {
      newTrainer.email = 'invalidEmail';
      await expect(new Trainer(newTrainer).validate()).rejects.toThrow();
    });

    it('should throw a validation error if password length is less than 6 characters', async () => {
      newTrainer.password = 'pass';
      await expect(new Trainer(newTrainer).validate()).rejects.toThrow();
    });

    it('should throw a validation error if password does not contain numbers', async () => {
      newTrainer.password = 'password';
      await expect(new Trainer(newTrainer).validate()).rejects.toThrow();
    });

    it('should throw a validation error if password does not contain letters', async () => {
      newTrainer.password = '123456';
      await expect(new Trainer(newTrainer).validate()).rejects.toThrow();
    });
  });
});
