import joi from "joi";

export const tweetSchema = joi.object({
  username: joi.string().required().messages({
    "string.base": "O nome de usuário deve ser uma string",
    "string.empty": "O nome de usuário não pode estar vazio",
    "any.required": "O nome de usuário é obrigatório"
  }),
  tweet: joi.string().required().messages({
    "string.base": "O tweet deve ser uma string",
    "string.empty": "O tweet não pode estar vazio",
    "any.required": "O conteúdo do tweet é obrigatório"
  })
});