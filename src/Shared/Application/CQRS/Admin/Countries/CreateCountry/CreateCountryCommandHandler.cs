using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Countries.CreateCountry;
public class CreateCountryCommandHandler : IRequestHandler<CreateCountryCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateCountryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateCountryCommand request, CancellationToken cancellationToken)
    {
        var hasCountryWithSuchName = await _context.Countries
            .AnyAsync(c => 
                EF.Functions.Like(c.Name, $"%{request.Name}%"), cancellationToken
            );
        if (hasCountryWithSuchName) return Result.Failure(ResultStatus.BadRequest, ErrorDescriber.Country.AlreadyExists(request.Name));

        await _context.Countries.AddAsync(new Country(request.Name), cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
 