import express from 'express';
import { ConfigService } from './infrastructure/config.service';
import { RouteService } from './infrastructure/route.service';
import { errorLogger, errorResponder, failSafeHandler } from './infrastructure/middleware/error-handling.middleware';

const app = express();

/*
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorLogger);
app.use(errorResponder);
app.use(failSafeHandler);

/*
 * Routes
 */
RouteService.registerApiRoutes(app);

try {
  const port = ConfigService.port;

  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}
