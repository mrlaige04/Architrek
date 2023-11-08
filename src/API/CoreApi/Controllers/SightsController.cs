using Application.Common.Models;
using Application.CQRS.SightCollection.GetSights.GetAllSights;
using Application.CQRS.SightCollection.GetSights.GetSightById;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class SightsController : ApiControllerBase
{
    [HttpGet, Route("")]
    public async Task<PaginatedList<Sight>> GetAllSightsAsync([FromQuery] int pageNumber, [FromQuery] int pageSize)
    {
        return await Mediator.Send(new GetAllSightsQuery(pageNumber, pageSize));
    }

    [HttpGet, Route("{id:guid}")]
    public async Task<Sight?> GetSightByIdAsync(Guid id)
    {
        return await Mediator.Send(new GetSightByIdQuery(id));
    }
}
