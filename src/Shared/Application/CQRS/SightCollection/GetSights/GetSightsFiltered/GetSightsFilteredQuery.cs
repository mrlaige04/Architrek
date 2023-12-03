using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
public record GetSightsFilteredQuery(Guid? CategoryId, int PageNumber, int PageSize, string? Q) : IRequest<PaginatedList<Sight>>;
