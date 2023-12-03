using Application.Common.Models;
using Application.CQRS.SightCollection.GetSights.GetAllSights;
using Application.CQRS.SightCollection.GetSights.GetSightById;
using Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
using Application.CQRS.SightCollection.Reviews.AddReview;
using Application.CQRS.SightCollection.Reviews.GetSightReviews;
using Application.CQRS.User.FavoriteSights.AddSightToFavorite;
using Application.CQRS.User.FavoriteSights.RemoveSightFromFavorite;
using Application.Identity;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CoreApi.Controllers;
public class SightsController : ApiControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public SightsController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet] public async Task<PaginatedList<Sight>> GetAllSightsAsync([FromQuery] GetAllSightsQuery query)
        => await Mediator.Send(query);
    

    [HttpGet, Route("{Id:guid}")] public async Task<Sight?> GetSightByIdAsync([FromRoute] GetSightByIdQuery query)
        => await Mediator.Send(query);


    [HttpGet, Route("filter")]
    public async Task<PaginatedList<Sight>> GetSightsFilteredAsync([FromQuery] GetSightsFilteredQuery query)
        => await Mediator.Send(query);

    [HttpPost, Route("review/{id:guid}"), DisableRequestSizeLimit, Authorize]
    public async Task<Result> ReviewSightAsync(Guid id, [FromBody] AddReviewCommand review)
    {   
        var user = await _userManager.GetUserAsync(User);

        if (user == null) return Result.Failure(ResultStatus.NotFound, "Unauthorized");

        review.UserId = user.Id;
        review.SightId = id;
        review.Reviewer = user.UserName;

        return await Mediator.Send(review);
    }

    [HttpGet, Route("{id:guid}/reviews")]
    public async Task<IEnumerable<SightReview>> SightReviews(Guid id)
        => await Mediator.Send(new GetSightReviewsQuery { SightId = id });
    

    [HttpPost, Route("{Id:guid}/favorite"), Authorize]
    public async Task<Result> AddToFavorite([FromRoute] AddToFavoriteCommand command)
        => await Mediator.Send(new AddToFavoriteCommand(command.Id) { User = User});

    [HttpDelete, Route("{Id:guid}/favorite"), Authorize]
    public async Task<Result> RemoveFromFavorite([FromRoute] RemoveSightFromFavoriteCommand command)
        => await Mediator.Send(new RemoveSightFromFavoriteCommand(command.Id) { User = User });

   

    [HttpGet, Route("{id:guid}/hasFav")]
    public async Task<bool> HasInFavorite(Guid id)
    {
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId))
        {
            var user = await _context.Users
                .Include(u=>u.FavoriteSights)
                .FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return false;

            return user.FavoriteSights.FirstOrDefault(x => x.SightId == id) != null;
        } 
        
        return false;
    }
}
