using Application.Common.Models;

namespace Application.CQRS.Admin.Sights.DeleteSight;
public record DeleteSightCommand(Guid Id) : IRequest<Result>;
