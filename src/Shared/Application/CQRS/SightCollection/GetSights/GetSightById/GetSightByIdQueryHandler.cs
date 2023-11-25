using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetSightById;
public class GetSightByIdQueryHandler : IRequestHandler<GetSightByIdQuery, Sight?>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetSightByIdQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<Sight?> Handle(GetSightByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Sights
            .Include(s => s.SightPhotos)
            .Include(s => s.Tags)
            .Include(s => s.Location).ThenInclude(l => l.Country)
            .Include(s=>s.Information)
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken: cancellationToken);

    }
}
