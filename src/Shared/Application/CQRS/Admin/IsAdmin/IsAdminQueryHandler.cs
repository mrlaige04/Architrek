
using Application.Identity;
using Domain.Constants;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.Admin.IsAdmin;
public class IsAdminQueryHandler : IRequestHandler<IsAdminQuery, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public IsAdminQueryHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> Handle(IsAdminQuery request, CancellationToken cancellationToken)
    {
        if (request.User == null) return false;
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return false;

        return await _userManager.IsInRoleAsync(user, Roles.Administrator);
    }
}
