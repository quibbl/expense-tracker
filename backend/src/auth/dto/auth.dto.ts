export interface AuthSignUpDto {
  email: string;
  name: string;
  password: string;
}

export interface AuthSignInDto {
  email: string;
  password: string;
}

export interface AuthUserDataDto {
  email: string;
  name: string;
  password: string;
}

export interface AuthTokensDto {
  accessToken: string;
  accessTokenExpiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
}
