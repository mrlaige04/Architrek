using Application.Common.Models;

namespace Application.Common.Interfaces;
public interface IIdentityService
{
    Task<string?> GetUserNameAsync(Guid userId);
    Task<bool> IsInRoleAsync(Guid userId, string role);
    Task<(Result Result, Guid userId)> CreateUserAsync(string email, string? username, string password);
    Task<Result> DeleteUserAsync(Guid userId);
}
