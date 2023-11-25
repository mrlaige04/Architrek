using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Categories.GetAllCategories;
public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, PaginatedList<Category>>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetAllCategoriesQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<PaginatedList<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories.PaginatedListAsync(1, 10);
        
        return categories;
    }
}
