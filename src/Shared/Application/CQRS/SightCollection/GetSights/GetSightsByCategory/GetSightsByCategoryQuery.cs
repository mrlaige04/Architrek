using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
public class GetSightsByCategoryQuery : IRequest<PaginatedList<Sight>>
{
    public Guid CategoryId { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
