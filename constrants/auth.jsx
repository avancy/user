export const AUTH_ERROR_MESSAGES = {
  UserNotFoundException: 'Usuário não encontrado. Verifique o e-mail digitado.',
  NotAuthorizedException: 'Usuário não autorizado. Verifique suas credenciais.',
  UserNotConfirmedException: 'Usuário não confirmado. Verifique seu e-mail para ativar a conta.',
  UsernameExistsException: 'Este e-mail já está registrado. Tente outro ou faça login.',
  InvalidParameterException: 'Parâmetros inválidos. Verifique os dados fornecidos.',
  CodeMismatchException: 'O código de verificação está incorreto.',
  ExpiredCodeException: 'O código de verificação expirou. Solicite um novo.',
  LimitExceededException: 'Limite de tentativas excedido. Tente novamente mais tarde.',
  InvalidPasswordException:
    'Senha inválida. Ela deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.',
  TooManyFailedAttemptsException: 'Muitas tentativas falhas. Tente novamente mais tarde.',
  TooManyRequestsException: 'Muitas requisições. Aguarde um momento e tente novamente.',
  NetworkError: 'Erro de rede. Verifique sua conexão e tente novamente.',
  ServiceError: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
  PasswordResetRequiredException:
    'É necessário redefinir sua senha antes de fazer login. Siga as instruções enviadas ao seu e-mail.',
  InvalidLambdaResponseException: 'Erro ao validar os dados. Tente novamente mais tarde.',
  InvalidSecurityTokenException: 'Token de segurança inválido. Refaça o processo de autenticação.',
  MFAMethodNotFoundException: 'Método de autenticação multifator não encontrado.',
  InternalErrorException: 'Erro interno no servidor. Tente novamente mais tarde.',
  null: 'Erro desconhecido. Tente novamente mais tarde.',
  undefined: 'Erro desconhecido. Tente novamente mais tarde.',
};
