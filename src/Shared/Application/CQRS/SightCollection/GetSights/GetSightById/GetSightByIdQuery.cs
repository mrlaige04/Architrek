using Domain.Entities;

namespace Application.CQRS.SightCollection.GetSights.GetSightById;
public record GetSightByIdQuery(Guid Id) : IRequest<Sight?>;
