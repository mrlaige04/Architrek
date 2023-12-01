using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Profile.GetProfile;
public class GetProfileQueryHandler : IRequestHandler<GetProfileQuery, DataResult<UserProfile>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public GetProfileQueryHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<DataResult<UserProfile>> Handle(GetProfileQuery request, CancellationToken cancellationToken)
    {
        var userFromUM = await _userManager.GetUserAsync(request.User);
        if (userFromUM == null) return DataResult<UserProfile>.Failure(ErrorDescriber.User.Unauthorized());

        var user = await _context.Users
            .Include(u => u.Avatar)
            .FirstAsync(u => u.Id == userFromUM.Id);
        
        return DataResult<UserProfile>.Success(new UserProfile { Avatar = userFromUM.Avatar, Email = user.Email });
    }
}
