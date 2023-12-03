using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.GetFavoriteSights;
public class GetFavoriteSightsQueryHandler : IRequestHandler<GetFavoriteSightsQuery, DataResult<PaginatedList<Sight>>>
{
    private readonly IApplicationDbContext _context;

    public GetFavoriteSightsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DataResult<PaginatedList<Sight>>> Handle(GetFavoriteSightsQuery request, CancellationToken cancellationToken)
    {
        if (request.User == null) 
            return DataResult<PaginatedList<Sight>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());
        
        var hasUserId = Guid.TryParse(request.User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!hasUserId)
            return DataResult<PaginatedList<Sight>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var user = await _context.Users
            .Include(u => u.FavoriteSights)
                .ThenInclude(s => s.Sight)
                    .ThenInclude(s => s.SightPhotos)
            .FirstOrDefaultAsync(u => u.Id == userId);
        if (user is null)
            return DataResult<PaginatedList<Sight>>.Failure(ResultStatus.Unauthorized, ErrorDescriber.User.Unauthorized());

        var sights = _context.UserFavoriteSights
                .Where(ufs => ufs.UserId == userId)
                .Select(uf => uf.Sight);

        var sightsPaginated = await sights.PaginatedListAsync(request.PageNumber, request.PageSize);

        return DataResult<PaginatedList<Sight>>.Success(sightsPaginated); 
    }
}
