using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.AddSightToFavorite;
public class AddToFavoriteCommandHandler : IRequestHandler<AddToFavoriteCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public AddToFavoriteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(AddToFavoriteCommand request, CancellationToken cancellationToken)
    {
        if (request.User == null) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        var getUserId = Guid.TryParse(request.User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!getUserId) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var sight = await _context.Sights
            .FirstOrDefaultAsync(x => x.Id == request.Id);
        if (sight == null) 
            return Result.Failure(ResultStatus.NotFound, ErrorDescriber.Sight.NotFound(request.Id));

        var user = await _context.Users
            .Include(u => u.FavoriteSights)
            .FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null) 
            return Result.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        if (user.FavoriteSights.Any(fs => fs.SightId == request.Id)) 
            return Result.Failure(ResultStatus.BadRequest, ErrorDescriber.Sight.AlreadyInFavorite(request.Id));

        user.FavoriteSights.Add(new UserFavoriteSight { Sight = sight });
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
