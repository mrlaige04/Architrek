using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetNear;
public record GetNearQuery(double Latitude, double Longitude, double Radius, int PageNumber, int PageSize) : IRequest<PaginatedList<Sight>>;