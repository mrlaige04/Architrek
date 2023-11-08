using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
public class GetSightsByCategoryQueryHandler : IRequestHandler<GetSightsByCategoryQuery, PaginatedList<Sight>>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetSightsByCategoryQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<PaginatedList<Sight>> Handle(GetSightsByCategoryQuery request, CancellationToken cancellationToken)
    {
        return await _context.Sights
            .Where(s => s.CategoryId == request.CategoryId)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
