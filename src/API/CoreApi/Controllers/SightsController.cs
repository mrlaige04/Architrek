using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.SightCollection.GetSights.GetAllSights;
using Application.CQRS.SightCollection.GetSights.GetNear;
using Application.CQRS.SightCollection.GetSights.GetSightById;
using Application.CQRS.SightCollection.GetSights.GetSightsByCategory;
using Application.CQRS.SightCollection.Reviews.AddReview;
using Application.CQRS.SightCollection.Reviews.GetSightReviews;
using Application.CQRS.User.FavoriteSights.AddSightToFavorite;
using Application.CQRS.User.FavoriteSights.HasInFavorite;
using Application.CQRS.User.FavoriteSights.RemoveSightFromFavorite;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;
public class SightsController : ApiControllerBase
{
    [HttpGet] public async Task<PaginatedList<Sight>> GetAllSightsAsync([FromQuery] GetAllSightsQuery query)
        => await Mediator.Send(query);
    

    [HttpGet, Route("{Id:guid}")] public async Task<Sight?> GetSightByIdAsync([FromRoute] GetSightByIdQuery query)
        => await Mediator.Send(query);


    [HttpGet, Route("filter")]
    public async Task<PaginatedList<Sight>> GetSightsFilteredAsync([FromQuery] GetSightsFilteredQuery query)
        => await Mediator.Send(query);

    [HttpPost, Route("review/{id:guid}"), DisableRequestSizeLimit, Authorize]
    public async Task<Result> ReviewSightAsync(Guid id, [FromBody] AddReviewCommand review)
        => await Mediator.Send(new AddReviewCommand
        {
            Photos = review.Photos,
            Rating = review.Rating,
            SightId = id,
            User = User,
            Text = review.Text,
        });

    [HttpGet, Route("{id:guid}/reviews")]
    public async Task<IEnumerable<SightReview>> SightReviews(Guid id)
        => await Mediator.Send(new GetSightReviewsQuery { SightId = id });


    [HttpPost, Route("{Id:guid}/favorite"), Authorize]
    public async Task<Result> AddToFavorite([FromRoute] AddToFavoriteCommand command)
        => await Mediator.Send(command.WithUser(User));// new AddToFavoriteCommand(command.Id) { User = User});

    [HttpDelete, Route("{Id:guid}/favorite"), Authorize]
    public async Task<Result> RemoveFromFavorite([FromRoute] RemoveSightFromFavoriteCommand command)
        => await Mediator.Send(command.WithUser(User));// new RemoveSightFromFavoriteCommand(command.Id) { User = User });



    [HttpGet, Route("{Id:guid}/hasFav")]
    public async Task<bool> HasInFavorite([FromRoute] HasInFavoriteQuery query)
        => await Mediator.Send(query.WithUser(User));// new HasInFavoriteQuery(query.Id) { User = User });

    [HttpGet, Route("near")]
    public async Task<PaginatedList<Sight>> GetNear([FromQuery] GetNearQuery query)
        => await Mediator.Send(query);
}
