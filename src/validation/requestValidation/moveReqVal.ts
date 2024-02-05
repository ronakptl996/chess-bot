import Joi from "joi";
import logger from "../../logger";
import { IMoveBoard } from "../../interface";

const moveValidate = (data: IMoveBoard) => {
  const Schema = Joi.object({
    number: Joi.number().required(),
    pieceId: Joi.string().required(),
    selectChessItem: Joi.object({
      indexofChesscheck: Joi.number().required(),
    }).required(),
  }).unknown();

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("Error in moveValidate ", error.details);
  }
  return value;
};

export default moveValidate;
