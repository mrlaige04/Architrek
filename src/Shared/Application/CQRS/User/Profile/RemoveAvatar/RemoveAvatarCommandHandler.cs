using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Profile.RemoveAvatar;
public class RemoveAvatarCommandHandler : IRequestHandler<RemoveAvatarCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public RemoveAvatarCommandHandler(IApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }
    public async Task<Result> Handle(RemoveAvatarCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return Result.Failure(ErrorDescriber.User.Unauthorized());
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return Result.Failure(ErrorDescriber.User.Unauthorized());

        var avatar = await _context.UserAvatars.FirstOrDefaultAsync(ua => ua.UserId == user.Id);
        if (avatar == null) return Result.Success();

        _context.UserAvatars.Remove(avatar);

        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
