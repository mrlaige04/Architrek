using Domain.Entities;

namespace Application.CQRS.SightCollection.Reviews.GetSightReviews;
public class GetSightReviewsQuery : IRequest<IEnumerable<SightReview>>
{
    public Guid SightId { get; set; }
}
