using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Admin.Reports.CreateReport;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoreApi.Controllers;
public class ReportsController : ApiControllerBase
{
    [HttpGet, Route("subjects")]
    public async Task<IEnumerable<KeyValuePair<Subject, string>>> GetSubjects()
        => await Task.FromResult(Report.subjectDescriptions.ToList());

    [HttpGet, Route("statuses")]
    public async Task<IEnumerable<KeyValuePair<ReportStatus, string>>> GetStatuses()
        => await Task.FromResult(Report.reportStatusDescriptions.ToList());
    
    [HttpPost] public async Task<Result> Create([FromBody] CreateReportCommand command)
        => await Mediator.Send(command);
}
