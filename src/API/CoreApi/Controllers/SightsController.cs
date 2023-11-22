using Application.Common.Models;
using Application.CQRS.SightCollection.GetSights.GetAllSights;
using Application.CQRS.SightCollection.GetSights.GetSightById;
using Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
using Application.CQRS.SightCollection.Reviews.AddReview;
using Application.CQRS.SightCollection.Reviews.GetSightReviews;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Claims;

namespace CoreApi.Controllers;
public class SightsController : ApiControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public SightsController(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

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

    [HttpGet, Route("filter")]
    public async Task<PaginatedList<Sight>> GetSightsFilteredAsync([FromQuery] string? q, [FromQuery] Guid? id, [FromQuery] int pageNumber, [FromQuery] int pageSize)
    {
        return await Mediator.Send(new GetSightsFilteredQuery()
        {
            CategoryId = id,
            PageNumber = pageNumber,
            PageSize = pageSize,
            Query = q,
        });
    }

    [HttpPost, Route("review/{id:guid}"), DisableRequestSizeLimit, Authorize]
    public async Task<Result> ReviewSightAsync(Guid id, [FromBody] AddReviewCommand review)
    {
        
        var user = await _userManager.GetUserAsync(User);

        if (user == null) return Result.Failure("Unauthorized");

        review.UserId = user.Id;
        review.SightId = id;
        review.Reviewer = user.UserName;

        return await Mediator.Send(review);

    }

    [HttpGet, Route("{id:guid}/reviews")]
    public async Task<IEnumerable<SightReview>> SightReviews(Guid id)
    {
        return await Mediator.Send(new GetSightReviewsQuery { SightId = id });
    }
}
