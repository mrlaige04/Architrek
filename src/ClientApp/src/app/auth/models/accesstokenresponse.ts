export class AccessTokenResponse {
  constructor(
  public accessToken: string,
  public refreshToken: string,
  public tokenType: string, 
  public expiresIn: number) {
  }
}
