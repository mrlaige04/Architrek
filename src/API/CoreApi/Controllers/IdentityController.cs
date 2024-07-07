using System.Security.Claims;
using Application.Identity;
using Bogus;
using CoreApi.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class IdentityController(
    UserManager<ApplicationUser> userManager,
    IUserClaimsPrincipalFactory<ApplicationUser> claimsPrincipalFactory,
    TokenService tokenService
    ) : ApiControllerBase
{
    [HttpGet, Route("emailAvailable")] public async Task<bool> EmailIsAvailable([FromQuery] string email)
        => (await userManager.FindByEmailAsync(email)) == null;

    [HttpPost, Route("login")]
    public async Task<IActionResult> MyLogin([FromBody]LoginRequest loginRequest)
    {
        ApplicationUser? user = await userManager.FindByEmailAsync(loginRequest.Email);

        if (user is null) return Unauthorized("User not found");

        if (!await userManager.CheckPasswordAsync(user, loginRequest.Password))
            return Unauthorized("Incorrect password");

        ClaimsPrincipal claims = await claimsPrincipalFactory.CreateAsync(user);

        var token = tokenService.CreateAccessToken(claims);
        var refreshToken = tokenService.CreateRefreshToken();

        var response = new AccessTokenResponse("Bearer", token, refreshToken, 3600);

        return Ok(response);
    }
}

public record LoginRequest(string Email, string Password);
public record AccessTokenResponse(string TokenType, string AccessToken, string RefreshToken, long ExpiresIn);

