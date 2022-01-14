export function errorLogger(error, req, res, next) {
  console.error(error);
  next(error);
}

export const errorResponder = (error, req, res, next) => {
  switch (error.type) {
  case 'redirect':
    res.redirect('/error');
    break;
  case 'time-out':
    res.status(408).send(error);
    break;
  default:
    next(error);
    break;
  }
};

export const failSafeHandler = (error, req, res, next) => {
  res.status(500).send(error);
};
