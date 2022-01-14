import express from 'express';
import { FactController } from '../controllers/fact.controller';

export const RouteService = {
  registerApiRoutes(app) {
    const router = express.Router();
    app.use('/api', router);

    /*
     * Routing table
     */
    router.post('/facts/find', FactController.find);
    router.post('/facts/insert', FactController.insert);
  },
};
