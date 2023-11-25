using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Categories.CreateCategoryCommand;
public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IElasticSearchService _elasticSearch;

    public CreateCategoryCommandHandler(IApplicationDbContext context, IElasticSearchService elasticSearch)
    {
        _context = context;
        _elasticSearch = elasticSearch;
    }

    public async Task<Result> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = new Category(request.Name);

        //await _elasticSearch.IndexEntityAsync(category);

        await _context.Categories.AddAsync(category, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
