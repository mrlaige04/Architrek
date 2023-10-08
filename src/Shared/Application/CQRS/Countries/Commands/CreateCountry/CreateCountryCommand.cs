using Domain.Entities;
using Domain.Enums;

namespace Application.CQRS.Countries.Commands.CreateCountry;
public record CreateCountryCommand : IRequest<Guid>
{
    public string Name { get; set; }
    public int Population { get; set; }
    public string Currency { get; set; }
    public string CurrencyEn { get; set; }
    public double Area { get; set; }
    public string Language { get; set; }
    public Mainland Mainland { get; set; }

    public City? Capital { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<City> Cities { get; set; }
}
