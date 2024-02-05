import Joi from "joi";
import logger from "../../logger";

const socketValidate = (data: any) => {
  let Schema = Joi.object({
    eventName: Joi.string().required(),
    data: Joi.object({
      playerInfo: Joi.array().required(),
      board: Joi.array().required(),
      pieceColor: Joi.string().required(),
      tableId: Joi.string().required(),
    }),
  });

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error(`Error in socketValidate ${error.details}`);
  }
  return value;
};

const roomValidate = (data: any) => {
  let Schema = Joi.object({
    eventName: Joi.string().required(),
    data: Joi.object({
      currentturn: Joi.any().required(),
      pieceColor: Joi.string().required(),
      turnMessage: Joi.string().required(),
      tableId: Joi.string().required(),
      roundTimer: Joi.number().required(),
    }),
  });

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("ERROR IN roomValidate", error.details);
  }
  return value;
};

export { socketValidate, roomValidate };
