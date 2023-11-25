using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoreApi.Controllers;
[Authorize, Authorize("admin")]
public class ReportController : Controller
{
    private readonly IApplicationDbContext _context;

    public ReportController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost, Route("")] public async Task<IActionResult> Create([FromBody] Report report)
    {
        await _context.Reports.AddAsync(report);
        await _context.SaveChangesAsync(CancellationToken.None);

        return Ok();
    }

    [HttpPost, Route("{id:guid}/setActive")] public async Task<IActionResult> SetActive(Guid id)
    {
        var report = await _context.Reports.FirstOrDefaultAsync(x => x.Id == id);
        if (report is null) return NotFound();

        report.Status = ReportStatus.Active;
        await _context.SaveChangesAsync(CancellationToken.None);

        return Ok();
    }
}
