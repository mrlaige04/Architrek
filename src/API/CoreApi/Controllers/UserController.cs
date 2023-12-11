using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Admin.Reviews.DeleteReview;
using Application.CQRS.User.FavoriteSights.GetFavoriteSights;
using Application.CQRS.User.Profile.DeleteProfile;
using Application.CQRS.User.Profile.GetProfile;
using Application.CQRS.User.Profile.RemoveAvatar;
using Application.CQRS.User.Profile.SetAvatar;
using Application.CQRS.User.Reviews.EditReview;
using Application.CQRS.User.Reviews.GetMyReviews;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;

[Authorize] public class UserController : ApiControllerBase
{
    [HttpGet, Route("favorites")]
    public async Task<DataResult<PaginatedList<Sight>>> GetMyFavorites([FromQuery] GetFavoriteSightsQuery query)
        => await Mediator.Send(query.WithUser(User));// new GetFavoriteSightsQuery(query.PageNumber, query.PageSize) { User = User });

    [HttpGet, Route("profile")]
    public async Task<DataResult<UserProfile>> GetProfile()
        => await Mediator.Send(new GetProfileQuery { User = User });

    [HttpPost, Route("avatar")]
    public async Task<Result> SetAvatar([FromBody] SetAvatarCommand command)
        => await Mediator.Send(command.WithUser(User));// new SetAvatarCommand(command.Url) { User = User });

    [HttpDelete, Route("avatar")]
    public async Task<Result> RemoveAvatar()
        => await Mediator.Send(new RemoveAvatarCommand { User = User });

    [HttpDelete, Route("account")]
    public async Task<Result> DeleteAccount() 
        => await Mediator.Send(new DeleteProfileCommand { User = User });


    [HttpGet, Route("reviews")]
    public async Task<DataResult<PaginatedList<SightReview>>> GetReviews([FromQuery] GetMyReviewQuery query)
        => await Mediator.Send(query.WithUser(User));

    [HttpDelete, Route("reviews/{Id:guid}")]
    public async Task<Result> DeleteReview([FromRoute] DeleteReviewCommand command)
        => await Mediator.Send(command.WithUser(User));

    /*[HttpPost, Route("reviews/{Id:guid}")]
    public async Task<Result> ChangeReviewText([FromBody] ChangeReviewTextCommand command)
        => await Mediator.Send(command.WithUser(User));*/


    [HttpPost, Route("reviews/{Id:guid}"), DisableRequestSizeLimit]
    public async Task<Result> EditReview([FromBody] EditReviewCommand command)
        => await Mediator.Send(command.WithUser(User));
}
