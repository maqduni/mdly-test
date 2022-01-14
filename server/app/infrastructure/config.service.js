import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

export const ConfigService = {
  get port() {
    return process.env.PORT || 3000;
  }
};
