using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Profile.SetAvatar;
public record SetAvatarCommand(string Url) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
