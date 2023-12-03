using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Categories.GetAllCategories;
public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, PaginatedList<Category>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCategoriesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<PaginatedList<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        return _context.Categories.PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
