using Application.Common.Interfaces;
using Application.Common.Models;

namespace Application.CQRS.Admin.Reports.DeleteReport;
public class DeleteReportCommandHandler : IRequestHandler<DeleteReportCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteReportCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteReportCommand request, CancellationToken cancellationToken)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(rep => rep.Id == request.Id);
        if (report == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Report", request.Id));

        _context.Reports.Remove(report);
        await _context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
