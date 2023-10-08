using Application.Common.Interfaces;
using Domain.Entities;
namespace Application.CQRS.Countries.Commands.CreateCountry;
public class CreateCountryCommandHandler : IRequestHandler<CreateCountryCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateCountryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCountryCommand request, CancellationToken cancellationToken)
    {
        var country = new Country
        {
            Name = request.Name,
            Population = request.Population,
            Currency = request.Currency,
            Area = request.Area,
            Language = request.Language,
            Mainland = request.Mainland,
            Cities = request.Cities,
            Capital = request.Capital,
            Photos = request.Photos,
        };

        await _context.Countries.AddAsync(country, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return country.Id;
    }
}
