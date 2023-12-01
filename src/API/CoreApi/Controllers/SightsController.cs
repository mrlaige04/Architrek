using Application.Common.Models;
using Application.CQRS.SightCollection.GetSights.GetAllSights;
using Application.CQRS.SightCollection.GetSights.GetSightById;
using Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
using Application.CQRS.SightCollection.Reviews.AddReview;
using Application.CQRS.SightCollection.Reviews.GetSightReviews;
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

    [HttpPost, Route("{id:guid}/like"), Authorize]
    public async Task<IActionResult> AddToFavorite(Guid id)
    {
        var sight = await _context.Sights.FirstOrDefaultAsync(x => x.Id == id);
        if (sight == null) return NotFound();

        var getUserId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!getUserId) return Unauthorized();

        var user = await _context.Users.Include(u=>u.FavoriteSights).FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null) return Unauthorized();

        if (user.FavoriteSights.Any(fs => fs.SightId == id)) return BadRequest();

        user.FavoriteSights.Add(new UserFavoriteSight { Sight = sight });
        await _context.SaveChangesAsync();
        return Ok(Result.Success());
    }

    [HttpDelete, Route("{id:guid}/unlike"), Authorize]
    public async Task<IActionResult> RemoveFromFavorite(Guid id)
    {
        var sight = await _context.Sights.FirstOrDefaultAsync(x => x.Id == id);
        if (sight == null) return NotFound();

        var getUserId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!getUserId) return Unauthorized();

        var user = await _context.Users.Include(u => u.FavoriteSights).FirstOrDefaultAsync(x => x.Id == userId);
        if (user == null) return Unauthorized();

        var userFavoriteSight = user.FavoriteSights.FirstOrDefault(x => x.SightId == sight.Id);


        user.FavoriteSights.Remove(userFavoriteSight);
        await _context.SaveChangesAsync();
        return Ok(Result.Success());
    }

    [HttpGet, Route("{id:guid}/hasFav")]
    public async Task<bool> HasInFavorite(Guid id)
    {
        if (Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId))
        {
            var user = await _context.Users
                .Include(u=>u.FavoriteSights)
                .FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null) return false;

            return user.FavoriteSights.FirstOrDefault(x => x.Id == id) != null;
        } 
        
        return false;
    }
}
