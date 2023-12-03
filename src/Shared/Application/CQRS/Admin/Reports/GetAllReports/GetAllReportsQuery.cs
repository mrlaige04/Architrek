using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reports.GetAllReports;
public record GetAllReportsQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<Report>>;