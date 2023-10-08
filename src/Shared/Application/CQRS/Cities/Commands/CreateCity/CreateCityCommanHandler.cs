using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Exceptions;

namespace Application.CQRS.Cities.Commands.CreateCity;
public class CreateCityCommanHandler : IRequestHandler<CreateCityCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateCityCommanHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCityCommand request, CancellationToken cancellationToken)
    {
        var country = await _context.Countries.FirstOrDefaultAsync(c => c.Id == request.CountryId, cancellationToken) 
            ?? throw new NotFoundException(nameof(City), request.CountryId.ToString());

        var city = new City
        {
            Name = request.Name,
            Coordinate = request.Coordinate,
            Country = country,
            CountryId = request.CountryId,
        };

        await _context.Cities.AddAsync(city, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return city.Id;
    }
}
