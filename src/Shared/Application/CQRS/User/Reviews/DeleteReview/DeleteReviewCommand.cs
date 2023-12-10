using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Reviews.DeleteReview;
public record DeleteReviewCommand(Guid Id) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
