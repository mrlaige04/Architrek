using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CoreApi.Identity.Models.Providers;

public class SixDigitUserTokenProvider : IUserTwoFactorTokenProvider<ApplicationUser>
{
    public Task<bool> CanGenerateTwoFactorTokenAsync(UserManager<ApplicationUser> manager, ApplicationUser user)
    {
        return Task.FromResult(true);
    }

    public Task<string> GenerateAsync(string purpose, UserManager<ApplicationUser> manager, ApplicationUser user)
    {
        if (purpose == TokenOptions.DefaultEmailProvider || purpose == "EmailConfirmation")
        {
            // Генеруємо 6-значний числовий код на основі ідентифікатора користувача
            string code = GenerateSixDigitCodeFromUserId(user.Id);
            return Task.FromResult(code);
        }

        throw new NotSupportedException($"Purpose '{purpose}' is not supported for generating a 6-digit code.");
    }

    public Task<bool> ValidateAsync(string purpose, string token, UserManager<ApplicationUser> manager, ApplicationUser user)
    {
        if (purpose == TokenOptions.DefaultEmailProvider || purpose == "EmailConfirmation")
        {
            // Перевіряємо, чи введений користувачем токен співпадає з очікуваним
            string expectedCode = GenerateSixDigitCodeFromUserId(user.Id);
            return Task.FromResult(token == expectedCode);
        }

        throw new NotSupportedException($"Purpose '{purpose}' is not supported for validating a 6-digit code.");
    }

    private string GenerateSixDigitCodeFromUserId(Guid userId)
    {
        int hash = userId.GetHashCode();
        hash = Math.Abs(hash); 
        string code = (hash % 900000 + 100000).ToString(); 
        return code;
    }
}
