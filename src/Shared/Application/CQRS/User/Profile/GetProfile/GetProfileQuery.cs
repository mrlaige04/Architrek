using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Profile.GetProfile;
public class GetProfileQuery : IAuthorizedRequest<DataResult<UserProfile>>
{
    public ClaimsPrincipal User { get; set; }
}
