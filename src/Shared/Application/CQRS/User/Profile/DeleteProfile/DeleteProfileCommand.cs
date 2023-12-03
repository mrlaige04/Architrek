using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Profile.DeleteProfile;
public record DeleteProfileCommand : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal User { get; set; }
}
