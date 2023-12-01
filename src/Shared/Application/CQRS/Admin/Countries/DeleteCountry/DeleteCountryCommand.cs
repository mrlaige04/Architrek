using Application.Common.Models;

namespace Application.CQRS.Admin.Countries.DeleteCountry;
public class DeleteCountryCommand : IRequest<Result>
{
    public Guid Id { get; set; }
}
