using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetAllSights;
public record GetAllSightsQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<Sight>>;
