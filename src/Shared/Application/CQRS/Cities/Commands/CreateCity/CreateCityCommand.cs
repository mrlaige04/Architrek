using Domain.Entities;

namespace Application.CQRS.Cities.Commands.CreateCity;
public class CreateCityCommand : IRequest<Guid>
{
    public string Name { get; set; }

    public Guid CountryId { get; set; }

    public Coordinate Coordinate { get; set; }
}
