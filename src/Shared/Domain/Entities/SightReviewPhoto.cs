namespace Domain.Entities;
public class SightReviewPhoto : BaseAuditableEntity
{
    public string Url { get; set; }
    public SightReview SightReview { get; set; }
    public Guid SightReviewId { get; set; }
}
