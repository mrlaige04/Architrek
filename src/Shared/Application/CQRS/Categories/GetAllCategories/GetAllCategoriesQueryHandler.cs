using Application.Common.Interfaces;
using Domain.Entities;

namespace Application.CQRS.Categories.GetAllCategories;
public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryName>>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetAllCategoriesQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<IEnumerable<CategoryName>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _context.Categories.Select(
            c=>new CategoryName()
        {
                Id = c.Id,
                Name = c.Name,
        }).ToListAsync(cancellationToken);
        
        return categories;
    }
}
