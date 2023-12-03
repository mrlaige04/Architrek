using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;

namespace Application.CQRS.Admin.Reports.CreateReport;
public class CreateReportCommandHandler : IRequestHandler<CreateReportCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public CreateReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(CreateReportCommand request, CancellationToken cancellationToken)
    {
        var report = new Report
        {
            Email = request.Email,
            Subject = request.Subject,
            Message = request.Message,
            Status = ReportStatus.Created
        };

        await _context.Reports.AddAsync(report);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
