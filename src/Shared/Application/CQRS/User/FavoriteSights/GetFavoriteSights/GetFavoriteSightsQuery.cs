using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using System.Security.Claims;

namespace Application.CQRS.User.FavoriteSights.GetFavoriteSights;
public record GetFavoriteSightsQuery(int PageNumber, int PageSize) : IAuthorizedRequest<DataResult<PaginatedList<Sight>>>
{
    public ClaimsPrincipal? User { get; set; }
}
