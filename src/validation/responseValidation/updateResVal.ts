import Joi from "joi";
import logger from "../../logger";

const updateRoomValidate = (data: any) => {
  const Schema = Joi.object({
    eventName: Joi.string().required(),
    data: Joi.object({
      playerInfo: Joi.array().required(),
      currentTurn: Joi.string().required(),
      board: Joi.array().required(),
      maxPlayer: Joi.number().required(),
      activePlayer: Joi.number().required(),
    }).unknown(),
  });

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("ERROR IN updateRoomvalidate", error.details);
  } else {
    return value;
  }
};

export default updateRoomValidate;
