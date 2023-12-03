using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reports.GetAllReports;
public class GetAllReportsQueryHandler : IRequestHandler<GetAllReportsQuery, PaginatedList<Report>>
{
    private readonly IApplicationDbContext _context;

    public GetAllReportsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<Report>> Handle(GetAllReportsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Reports.PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
