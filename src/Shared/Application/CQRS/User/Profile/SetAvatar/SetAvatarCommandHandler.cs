using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Profile.SetAvatar;
public class SetAvatarCommandHandler : IRequestHandler<SetAvatarCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public SetAvatarCommandHandler(IApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<Result> Handle(SetAvatarCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var userFromUM = await _userManager.GetUserAsync(request.User);
        if (userFromUM == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var previousAvatars = _context.UserAvatars
            .Where(ua => ua.UserId == userFromUM.Id);

        _context.UserAvatars.RemoveRange(previousAvatars);

        await _context.UserAvatars.AddAsync(new UserAvatar { Url = request.Url, UserId = userFromUM.Id });
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
