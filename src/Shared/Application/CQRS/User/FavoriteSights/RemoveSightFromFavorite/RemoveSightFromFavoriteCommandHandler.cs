using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.RemoveSightFromFavorite;
public class RemoveSightFromFavoriteCommandHandler : IRequestHandler<RemoveSightFromFavoriteCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public RemoveSightFromFavoriteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(RemoveSightFromFavoriteCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var getUserId = Guid.TryParse(request.User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!getUserId) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var sight = await _context.Sights
            .FirstOrDefaultAsync(x => x.Id == request.Id);
        if (sight == null) 
            return Result.Failure(404, ErrorDescriber.Sight.NotFound(request.Id));

        var user = await _context.Users
            .Include(u => u.FavoriteSights)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var userFavorite = user.FavoriteSights.FirstOrDefault(fs => fs.SightId == request.Id);
        if (userFavorite == null)
            return Result.Failure(ResultStatus.BadRequest, ErrorDescriber.Sight.IsNotInFavorite(request.Id));

        user.FavoriteSights.Remove(userFavorite);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
