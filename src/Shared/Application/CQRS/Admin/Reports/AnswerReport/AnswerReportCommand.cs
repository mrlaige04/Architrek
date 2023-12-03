using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.AnswerReport;
public record AnswerReportCommand(Guid Id, string Message) : IRequest<Result>;
