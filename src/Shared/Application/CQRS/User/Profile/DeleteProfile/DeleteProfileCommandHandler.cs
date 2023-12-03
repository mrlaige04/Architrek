using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Identity;
using Microsoft.AspNetCore.Identity;

namespace Application.CQRS.User.Profile.DeleteProfile;
public class DeleteProfileCommandHandler : IRequestHandler<DeleteProfileCommand, Result>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public DeleteProfileCommandHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<Result> Handle(DeleteProfileCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.GetUserAsync(request.User);
        if (user == null) return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        _context.Users.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
