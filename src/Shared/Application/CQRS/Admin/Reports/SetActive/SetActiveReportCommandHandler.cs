using Application.Common.Interfaces;
using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.SetActive;
public class SetActiveReportCommandHandler : IRequestHandler<SetActiveReportCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public SetActiveReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(SetActiveReportCommand request, CancellationToken cancellationToken)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(rep => rep.Id == request.Id);
        if (report == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Report", request.Id));

        report.Status = Domain.Entities.ReportStatus.Active;
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
