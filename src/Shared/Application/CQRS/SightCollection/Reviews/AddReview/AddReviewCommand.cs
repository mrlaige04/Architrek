using Application.Common.Models;

namespace Application.CQRS.SightCollection.Reviews.AddReview;
public class AddReviewCommand : IRequest<Result>
{
    public Guid SightId { get; set; }
    public double Rating { get; set; }
    public string? Text { get; set; }
    public Guid UserId { get; set; }
    public string? Reviewer { get; set; }

    public List<string>? Photos { get; set; }
}
