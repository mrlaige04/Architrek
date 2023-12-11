using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using System.Security.Claims;

namespace Application.CQRS.User.Reviews.GetMyReviews;
public record GetMyReviewQuery(int PageNumber, int PageSize) : IAuthorizedRequest<DataResult<PaginatedList<SightReview>>>
{
    public ClaimsPrincipal? User { get; set; }
}

