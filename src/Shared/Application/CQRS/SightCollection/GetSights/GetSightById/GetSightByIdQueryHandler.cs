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
        return await _context.Sights.FirstOrDefaultAsync(s =>s.Id == request.Id, cancellationToken: cancellationToken);
    }
}
