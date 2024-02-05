import Joi from "joi";
import { IUpdateBoard } from "../../interface";
import logger from "../../logger";

const updateValidate = (data: IUpdateBoard) => {
  const Schema = Joi.object({
    chessBoard: Joi.array().required(),
  });

  const { error, value } = Schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("ERROR IN updatevalidate", error.details);
  } else {
    return value;
  }
};

export default updateValidate;
