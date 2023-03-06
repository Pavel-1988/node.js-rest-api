const requiredFieldsValidate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);

    if (error) {
      return res.status(400).json({
        status: "Invalid request data",
        code: 400,
        message: "missed filds"
      });
    }
    next();
  };
}

module.exports =  requiredFieldsValidate ;
