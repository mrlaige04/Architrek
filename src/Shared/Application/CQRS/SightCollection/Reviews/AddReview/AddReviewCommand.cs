using Application.Common.Interfaces;
using Application.Common.Models;
using System.Security.Claims;

namespace Application.CQRS.SightCollection.Reviews.AddReview;
public class AddReviewCommand : IAuthorizedRequest<Result>
{
    public Guid SightId { get; set; }
    public double Rating { get; set; }
    public string? Text { get; set; }
    public string? Reviewer { get; set; }

    public List<string>? Photos { get; set; }
    public ClaimsPrincipal? User { get; set; }
}
