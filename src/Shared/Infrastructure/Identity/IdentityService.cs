using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;
public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public IdentityService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<(Result Result, Guid userId)> CreateUserAsync(string email, string? username, string password)
    {
        var user = new ApplicationUser
        {
            Email = email,
            UserName = username ?? email
        };

        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<Result> DeleteUserAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user == null)
            return Result.Failure("User not found");

        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }

    public async Task<string?> GetUserNameAsync(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        if (user == null)
            return string.Empty;

        return user.UserName;
    }

    public async Task<bool> IsInRoleAsync(Guid userId, string role)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        return user is null
            ? throw new NotFoundException(nameof(ApplicationUser), userId.ToString())
            : await _userManager.IsInRoleAsync(user, role);
    }
}
