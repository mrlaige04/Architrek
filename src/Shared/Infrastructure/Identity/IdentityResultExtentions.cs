using Application.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;
public static class IdentityResultExtentions
{
    public static Result ToApplicationResult(this IdentityResult result)
    {
        return result.Succeeded ?
            Result.Success() :
            Result.Failure(result.Errors.Select(e => e.Description));
    }
}
