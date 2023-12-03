using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Admin.Reports.CreateReport;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoreApi.Controllers;
public class ReportsController : ApiControllerBase
{
    private readonly IApplicationDbContext _context;

    public ReportsController(IApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet, Route("subjects")]
    public async Task<IEnumerable<KeyValuePair<Subject, string>>> GetSubjects()
        => await Task.FromResult(Report.subjectDescriptions.ToList());

    [HttpGet, Route("statuses")]
    public async Task<IEnumerable<KeyValuePair<ReportStatus, string>>> GetStatuses()
        => await Task.FromResult(Report.reportStatusDescriptions.ToList());
    

    [HttpPost] public async Task<Result> Create([FromBody] CreateReportCommand command)
        => await Mediator.Send(command);

    [HttpPost, Route("{id:guid}/setActive")] public async Task<IActionResult> SetActive(Guid id)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(x => x.Id == id);
        if (report is null) return NotFound();

        report.Status = ReportStatus.Active;
        await _context.SaveChangesAsync(CancellationToken.None);

        return Ok();
    }
}
