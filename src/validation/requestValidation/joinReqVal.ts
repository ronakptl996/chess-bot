import Joi from "joi";
import { IUser } from "../../interface";
import logger from "../../logger";

const joinValidate = (data: IUser) => {
  const schema = Joi.object({
    playername: Joi.string()
      .pattern(/^[a-zA-Z\s]*$/)
      .required()
      .trim(),
    socketId: Joi.string().required(),
    turn: Joi.boolean().required(),
    isBot: Joi.boolean().required(),
  });

  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    logger.error("ERROR IN joinValidate", error.details);
  }
  return value;
};

export default joinValidate;
