using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.AddSightToFavorite;
public record AddToFavoriteCommand(Guid Id) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
