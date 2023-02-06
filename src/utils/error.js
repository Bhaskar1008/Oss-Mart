export const BadRequest = (message, error = null, code = 400) => {
  return { code: code ?? 400, message, error };
};
