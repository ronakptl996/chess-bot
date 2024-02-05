import Joi from "joi";
import logger from "../../logger";

const moveRoomValidate = (data: any) => {
  const Schema = Joi.object({
    eventName: Joi.string().required(),
    data: Joi.object({
      emptyBox: Joi.object().required(),
      pieceId: Joi.string().required(),
      selectChessItem: Joi.object({
        indexofChesscheck: Joi.number().required(),
      }),
      number: Joi.number().required(),
      killPieceId: Joi.string().allow(null).required(),
      className: Joi.string().required(),
    }).unknown(),
  });

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("ERROR IN moveRoomValidate", error.details);
  } else {
    return value;
  }
};

export default moveRoomValidate;
