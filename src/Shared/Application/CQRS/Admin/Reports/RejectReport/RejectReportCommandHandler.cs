using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Application.CQRS.Admin.Reports.RejectReport;
public class RejectReportCommandHandler : IRequestHandler<RejectReportCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailSender _emailSender;

    public RejectReportCommandHandler(IApplicationDbContext context, IEmailSender emailSender)
    {
        _context = context;
        _emailSender = emailSender;
    }

    public async Task<Result> Handle(RejectReportCommand request, CancellationToken cancellationToken)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(rep => rep.Id == request.Id);
        if (report == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Report", request.Id));

        report.Status = Domain.Entities.ReportStatus.Rejected;
        await _context.SaveChangesAsync(cancellationToken);

        await _emailSender.SendEmailAsync(report.Email, $"Report #{report.Id}", "Your report was rejected(");
        return Result.Success();
    }
}
