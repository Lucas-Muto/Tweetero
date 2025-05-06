import joi from "joi";

export const userSchema = joi.object({
  username: joi.string().required().messages({
    "string.base": "O nome de usuário deve ser uma string",
    "string.empty": "O nome de usuário não pode estar vazio",
    "any.required": "O nome de usuário é obrigatório"
  }),
  avatar: joi.string().uri().required().messages({
    "string.base": "O avatar deve ser uma string",
    "string.empty": "O avatar não pode estar vazio",
    "string.uri": "O avatar deve ser uma URL válida",
    "any.required": "O avatar é obrigatório"
  })
});
