const {isValidObjectId} = require("mongoose");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
      next(res.status(400).json({
          status: "error",
          code: 400,
          message:`${id} is not valid id`,
      })
      )
    }
    next();
}

module.exports = {isValidId};