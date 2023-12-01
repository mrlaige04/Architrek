using Application.Common.Models;
using Application.CQRS.User.Profile.GetProfile;
using Application.CQRS.User.Profile.RemoveAvatar;
using Application.CQRS.User.Profile.SetAvatar;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CoreApi.Controllers;

[Authorize] public class UserController : ApiControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    

    [HttpGet, Route("favorites")]
    public async Task<IEnumerable<Sight>> GetMyFavorites()
    {
        var hasUserId = Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId);
        if (!hasUserId) return Array.Empty<Sight>();

        var user = await _context.Users
            .Include(u=>u.FavoriteSights).ThenInclude(s=>s.Sight).ThenInclude(s=>s.SightPhotos)
            .FirstOrDefaultAsync(u=>u.Id == userId);
        if (user is null) return Array.Empty<Sight>();

        return user.FavoriteSights.Select(uf=>uf.Sight);
    }

    [HttpGet, Route("profile")]
    public async Task<DataResult<UserProfile>> GetProfile()
        => await Mediator.Send(new GetProfileQuery { User = User });


    [HttpPost, Route("avatar")]
    public async Task<Result> SetAvatar([FromBody] SetAvatarCommand command)
        => await Mediator.Send(new SetAvatarCommand(command.Url) { User = User });

    [HttpDelete, Route("avatar")]
    public async Task<Result> RemoveAvatar()
        => await Mediator.Send(new RemoveAvatarCommand { User = User });
}
