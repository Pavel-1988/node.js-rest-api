
const addContactValidate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
      next();
    };
  }
}

const updateContactValidate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
      next();
    };
  }
}

const patchFavoriteValidate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
      next();
    };
  }
}


module.exports = {
  addContactValidate,
  updateContactValidate,
  patchFavoriteValidate
} 