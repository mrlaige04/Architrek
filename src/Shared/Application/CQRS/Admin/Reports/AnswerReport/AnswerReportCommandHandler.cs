using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Application.CQRS.Admin.Reports.AnswerReport;
public class AnswerReportCommandHandler : IRequestHandler<AnswerReportCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailSender _emailSender;

    public AnswerReportCommandHandler(IApplicationDbContext context, IEmailSender emailSender)
    {
        _context = context;
        _emailSender = emailSender;
    }

    public async Task<Result> Handle(AnswerReportCommand request, CancellationToken cancellationToken)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(rep => rep.Id == request.Id);
        if (report == null) return Result.Failure(ResultStatus.NotFound, ErrorDescriber.NotFound("Report", request.Id));

        await _emailSender.SendEmailAsync(report.Email, $"Report #{report.Id}", $"You have got an answer to your report:<br/> {request.Message}");
        return Result.Success();
    }
}
