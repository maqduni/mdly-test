import express from 'express';
import { FactController, validateFact } from '../controllers/fact.controller';

export const RouteService = {
  registerApiRoutes(app) {
    const router = express.Router();
    app.use('/api', router);

    /*
     * Routing table
     */
    router.post('/facts/find', validateFact.find(), FactController.find);
    router.post('/facts/insert', validateFact.insert(), FactController.insert);
  },
};
