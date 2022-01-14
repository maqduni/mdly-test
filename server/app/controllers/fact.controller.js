import { FactService } from '../services/fact.service';
import { body, validationResult } from 'express-validator';

export const FactController = {
  find(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const result = FactService.find(req.body);

      const status = result.hasMatch ? 200 : 404;
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },

  insert(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const result = FactService.insert(req.body);

      const status = result.valueSets.length === 1 ? 201 : 200;
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
};

export const validateFact = {
  find() {
    return [
      body('fact', 'empty or doesn\'t exist').exists().bail().isString().bail().notEmpty().bail(),
      body('query', 'empty or doesn\'t exist').isArray({ min: 1 }).bail(),
      body('query.*').isString().bail().notEmpty().bail(),
    ];
  },

  insert() {
    return [
      body('fact', 'empty or doesn\'t exist').isString().bail().notEmpty().bail(),
      body('values', 'empty or doesn\'t exist').isArray({ min: 1 }).bail(),
      body('values.*').isString().bail().notEmpty().bail(),
    ];
  },
};
