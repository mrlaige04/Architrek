using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetAllSights;
public class GetAllSightsQueryHandler : IRequestHandler<GetAllSightsQuery, PaginatedList<Sight>>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetAllSightsQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public Task<PaginatedList<Sight>> Handle(GetAllSightsQuery request, CancellationToken cancellationToken)
    {
        return _context.Sights
            .Include(s=>s.SightPhotos)
            .Include(s=>s.Tags)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
