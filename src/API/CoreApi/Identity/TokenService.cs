using CoreApi.Identity.Models.Response;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CoreApi.Identity;

public class TokenService
{
    private readonly JwtOptions _jwtOptions;

    public TokenService(JwtOptions jwtOptions)
    {
        _jwtOptions = jwtOptions;
    }

    public AccessTokenResponse CreateAccessTokenResponse(Guid userId, string[] roles)
    {
        var accessToken = new AccessTokenResponse
        {
            AccessToken = CreateAccessToken(userId, roles),
            RefreshToken = CreateRefreshToken()
        };

        return accessToken;
    }

    public string CreateAccessToken(Guid userId, string[] roles)
    {
        var keyBytes = Encoding.UTF8.GetBytes(_jwtOptions.SigningKey);
        var symmetricKey = new SymmetricSecurityKey(keyBytes);

        var signingCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.NameId, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Aud, _jwtOptions.Audience)
        };

        if (roles.Length != 0)
        {
            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
            claims.AddRange(roleClaims);
        }

        var token = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                expires: DateTime.Now.Add(TimeSpan.FromSeconds(_jwtOptions.ExpirationSeconds)),
                signingCredentials: signingCredentials);
        
        var rawToken = new JwtSecurityTokenHandler().WriteToken(token);
        return rawToken;
    }

    public string CreateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}
