﻿using Application.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CoreApi.Controllers;
public class IdentityController : ApiControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly EmailAddressAttribute _emailAddressAttribute;
    private readonly IEmailSender _emailSender;
    //private readonly TokenService _tokenService;

    public IdentityController(
        UserManager<ApplicationUser> userManager,
        EmailAddressAttribute emailAddressAttribute,
        IEmailSender emailSender
        )
    {
        _userManager = userManager;
        _emailAddressAttribute = emailAddressAttribute;
        _emailSender = emailSender;
        //_tokenService = tokenService;
    }

    [HttpGet, Route("emailAvailable")] public async Task<bool> EmailIsAvailable([FromQuery] string email)
        => (await _userManager.FindByEmailAsync(email)) == null;


    /*[HttpPost, Route(""), Authorize] public async Task<Results<Ok, UnauthorizedResult, Result>> SetUsername([FromBody] SetUsernameRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is null) return Unauthorized();

        var setUserNameResult = await _userManager.SetUserNameAsync(user, request.Username);
        return setUserNameResult.ToApplicationResult();
    }*/

    //[HttpGet, Route(), Authorize] public async Task<Ok<>>

    /*[HttpPost, Route("register")]
    public async Task<Results<Ok<Guid>, ValidationProblem>> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || !_emailAddressAttribute.IsValid(request.Email)) 
            return CreateValidationProblem(IdentityResult.Failed(_userManager.ErrorDescriber.InvalidEmail(request.Email)));

        var user = new ApplicationUser
        {
            Email = request.Email,
            UserName = string.IsNullOrEmpty(request.Username) ? request.Email : request.Username
        };

        var createResult = await _userManager.CreateAsync(user, request.Password);

        if (!createResult.Succeeded) return CreateValidationProblem(createResult);
        await SendConfirmationEmailAsync(user);
        return TypedResults.Ok(user.Id);
    }

    [HttpPost, Route("login")]
    public async Task<Results<Ok<AccessTokenResponse>, ValidationProblem, NotFound, UnauthorizedHttpResult>> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrEmpty(request.Email) || !_emailAddressAttribute.IsValid(request.Email))
            return CreateValidationProblem(IdentityResult.Failed(_userManager.ErrorDescriber.InvalidEmail(request.Email)));

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null) return TypedResults.NotFound();

        var checkPasswordResult = await _userManager.CheckPasswordAsync(user, request.Password);

        if (!checkPasswordResult) return TypedResults.Unauthorized();

        var accessToken = _tokenService.CreateAccessTokenResponse(user.Id, Array.Empty<string>());

        user.RefreshToken = accessToken.RefreshToken;
        user.RefreshTokenExpires = DateTime.UtcNow.AddDays(1);
        await _userManager.UpdateAsync(user);
        return TypedResults.Ok(accessToken);
    }

    [HttpPost, Route("confirmEmail")]
    public async Task<Results<Ok, UnauthorizedHttpResult>> ConfirmEmail([FromBody] ConfirmEmailRequest request)
    {
        if (await _userManager.FindByIdAsync(request.UserId.ToString()) is not { } user)
        {
            return TypedResults.Unauthorized();
        }
        
        var confirmEmailResult = await _userManager.ConfirmEmailAsync(user, request.Code);

        if (!confirmEmailResult.Succeeded) return TypedResults.Unauthorized();

        return TypedResults.Ok();
    } 

    private static ValidationProblem CreateValidationProblem(IdentityResult result)
    {
        var errorDictionary = new Dictionary<string, string[]>(1);

        foreach (var error in result.Errors)
        {
            string[] newDescriptions;

            if (errorDictionary.TryGetValue(error.Code, out var descriptions))
            {
                newDescriptions = new string[descriptions.Length + 1];
                Array.Copy(descriptions, newDescriptions, descriptions.Length);
                newDescriptions[descriptions.Length] = error.Description;
            }
            else
            {
                newDescriptions = new[] { error.Description };
            }

            errorDictionary[error.Code] = newDescriptions;
        }

        return TypedResults.ValidationProblem(errorDictionary);
    }

    private async Task SendConfirmationEmailAsync(ApplicationUser user)
    {
        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        using var sr = new StreamReader("./Identity/VerificationEmailHtml.txt");
        var msg = await sr.ReadToEndAsync();

        msg = msg.Replace("{{code}}", code);

        await _emailSender.SendEmailAsync(user.Email, "Confirmation", msg);
    }*/
}
