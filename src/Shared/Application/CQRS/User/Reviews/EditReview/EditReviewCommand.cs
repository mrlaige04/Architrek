using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.User.Reviews.EditReview;
public record EditReviewCommand(Guid Id, string Text, double Rating, EditReviewPhotoCollection Photos) : IAuthorizedRequest<Result>
{
    public ClaimsPrincipal? User { get; set; }
}

public record EditReviewPhotoCollection(ICollection<string> Add, ICollection<Guid> Remove);
