using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Sights.CreateSightCommand;
public class CreateSightCommandHandler : IRequestHandler<CreateSightCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateSightCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateSightCommand request, CancellationToken cancellationToken)
    {
        /*var category = await _context.Categories
            .Include(c => c.Properties)
            .FirstOrDefaultAsync(cat => cat.Id == request.CategoryId, cancellationToken: cancellationToken);
        if (category == null) return Result.Failure("Category was not found");

        var sight = new Sight
        {
            Name = request.Name,
            Description = request.Description,
            CategoryId = category.Id,
            Category = category,
        };

        var properties = category.Properties.Join(request.PropertyValues,
            (prop) => prop.Id,
            (property) => property.PropertyId,
            (prop, property) =>
            {
                return new PropertyValue
                {
                    Id = property.PropertyId,
                    Property = prop,
                    JsonValue = property.JsonValue
                };
            });

        sight.PropertyValues = properties.ToList();

        var entry = await _context.Sights.AddAsync(sight);
        var saveChanges = await _context.SaveChangesAsync(cancellationToken);

        return entry != null && saveChanges > 0 ? Result.Success() : Result.Failure("Failure while adding new sight");*/
        return Result.Success();
    }
}
