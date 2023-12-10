using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Reviews.ChangeReviewText;
public record ChangeReviewTextCommand(Guid Id, string Text) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}
