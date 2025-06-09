import app from './app';
import dotenv from 'dotenv';
dotenv.config();
import config from './config';

import connectDatabase from './libraries/db/db';
import { handleGlobalError } from 'libraries/errors/globalErrorHandler';

(async () => {
  try {
    await connectDatabase();

    app.listen(config.port, () => {
      console.info(`Server running at PORT ${config.port}`);
    });

    process.on('unhandledRejection', (reason: unknown) => {
      handleGlobalError(reason);
    });

    process.on('uncaughtException', (error: Error) => {
      handleGlobalError(error);
    });
  } catch (error) {
    console.error('Failed to connect to DB, exiting.', error);
    process.exit(1);
  }
})();
