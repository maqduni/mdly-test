import { FactService } from '../services/fact.service';

export const FactController = {
  find(req, res, next) {
    // todo: validate input
    try {
      const result = FactService.find(req.body);

      const status = result.hasMatch ? 200 : 404;

      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },

  insert(req, res, next) {
    // todo: validate input
    try {
      const result = FactService.insert(req.body);

      const status = result.valueSets.length === 1 ? 201 : 200;

      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
};
