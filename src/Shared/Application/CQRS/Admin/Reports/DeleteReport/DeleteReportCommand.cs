using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.DeleteReport;
public record DeleteReportCommand(Guid Id): IRequest<Result>;