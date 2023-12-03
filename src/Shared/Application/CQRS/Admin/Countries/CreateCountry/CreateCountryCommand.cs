using Application.Common.Models;

namespace Application.CQRS.Admin.Countries.CreateCountry;
public class CreateCountryCommand : IRequest<Result>
{
    public string Name { get; set; }
}
