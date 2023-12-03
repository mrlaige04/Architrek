using Application.Common.Models;
using Application.CQRS.User.FavoriteSights.GetFavoriteSights;
using Application.CQRS.User.Profile.DeleteProfile;
using Application.CQRS.User.Profile.GetProfile;
using Application.CQRS.User.Profile.RemoveAvatar;
using Application.CQRS.User.Profile.SetAvatar;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.Controllers;

[Authorize] public class UserController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet, Route("favorites")]
    public async Task<DataResult<PaginatedList<Sight>>> GetMyFavorites([FromQuery] GetFavoriteSightsQuery query)
        => await Mediator.Send(new GetFavoriteSightsQuery(query.PageNumber, query.PageSize) { User = User });
    


    [HttpGet, Route("profile")]
    public async Task<DataResult<UserProfile>> GetProfile()
        => await Mediator.Send(new GetProfileQuery { User = User });


    [HttpPost, Route("avatar")]
    public async Task<Result> SetAvatar([FromBody] SetAvatarCommand command)
        => await Mediator.Send(new SetAvatarCommand(command.Url) { User = User });

    [HttpDelete, Route("avatar")]
    public async Task<Result> RemoveAvatar()
        => await Mediator.Send(new RemoveAvatarCommand { User = User });



    [HttpDelete, Route("account")]
    public async Task<Result> DeleteAccount() 
        => await Mediator.Send(new DeleteProfileCommand { User = User });

}
