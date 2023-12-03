using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reports.CreateReport;
public record CreateReportCommand(Subject Subject, string Email, string Message) : IRequest<Result>;

