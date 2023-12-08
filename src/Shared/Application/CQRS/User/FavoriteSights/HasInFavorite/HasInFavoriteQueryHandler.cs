
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.HasInFavorite;
public class HasInFavoriteQueryHandler : IRequestHandler<HasInFavoriteQuery, bool>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public HasInFavoriteQueryHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<bool> Handle(HasInFavoriteQuery request, CancellationToken cancellationToken)
    {
        if (request.User == null) return false;
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return false;

        return await _context.UserFavoriteSights
            .CountAsync(ufs => ufs.UserId == user.Id && ufs.SightId == request.Id, cancellationToken) > 0;
    }
}
