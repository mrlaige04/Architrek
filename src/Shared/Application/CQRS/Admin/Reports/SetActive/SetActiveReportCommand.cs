using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.SetActive;
public record SetActiveReportCommand(Guid Id) : IRequest<Result>;