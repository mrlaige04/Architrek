using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.RejectReport;
public record RejectReportCommand(Guid Id) : IRequest<Result>;