namespace CoreApi.Identity;

public record JwtOptions(
  string Issuer,
  string Audience,
  string SigningKey,
  int ExpirationSeconds
);
