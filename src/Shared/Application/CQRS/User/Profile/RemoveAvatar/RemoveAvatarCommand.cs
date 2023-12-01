using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Profile.RemoveAvatar;
public record RemoveAvatarCommand : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
