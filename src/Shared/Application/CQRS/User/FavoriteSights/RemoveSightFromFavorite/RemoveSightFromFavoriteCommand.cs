using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.RemoveSightFromFavorite;
public record RemoveSightFromFavoriteCommand(Guid Id) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
