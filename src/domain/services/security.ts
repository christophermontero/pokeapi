import logger from '../../utils/logger';
import bcrypt from 'bcrypt';
import config from 'config';

export const SecurityService = {
  generateJWT: async (password: string) => {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const pepper = Math.random().toString(36).substring(2, 10);
      const hashedPassword = await bcrypt.hash(password + pepper, salt);
      return { hashedPassword, pepper };
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  }
};
