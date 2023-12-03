using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;
using System.Text.RegularExpressions;

namespace Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
public class GetSightsFilteredQueryHandler : IRequestHandler<GetSightsFilteredQuery, PaginatedList<Sight>>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public GetSightsFilteredQueryHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<PaginatedList<Sight>> Handle(GetSightsFilteredQuery request, CancellationToken cancellationToken)
    {
        var queryable = _context.Sights
            .Include(s => s.SightPhotos)
            .Include(s => s.Tags)
            .AsQueryable();

        var category = await _context.Categories
            .Include(c=>c.Subcategories)
            .FirstOrDefaultAsync(c => c.Id == request.CategoryId, cancellationToken: cancellationToken);

        if (category != null) { 
            var ids = GetCategoryAndSubcategoryIds(category);
            queryable = queryable.Where(s=>ids.Contains(s.CategoryId));
        }

        if (!string.IsNullOrEmpty(request.Q))
            queryable = queryable.Where(s => EF.Functions.Like(s.Name.ToLower(), $"%{request.Q.ToLower()}%"));

        var sights = await queryable.PaginatedListAsync(request.PageNumber, request.PageSize);
        return await queryable
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }

    private List<Guid> GetCategoryAndSubcategoryIds(Category category)
    {
        var categoryIds = new List<Guid> { category.Id };

        if (category.Subcategories != null)
        {
            foreach (var subcategory in category.Subcategories)
            {
                var subcategoryIds = GetCategoryAndSubcategoryIds(subcategory);
                categoryIds.AddRange(subcategoryIds);
            }
        }

        return categoryIds;
    }
}
