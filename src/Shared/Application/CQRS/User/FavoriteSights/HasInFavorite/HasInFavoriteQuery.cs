using Application.Common.Interfaces;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.HasInFavorite;
public record HasInFavoriteQuery(Guid Id) : IAuthorizedRequest<bool>
{
    public ClaimsPrincipal? User { get; set; }
}
