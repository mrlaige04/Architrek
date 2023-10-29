namespace Domain.Entities;
public class SightReviewPhoto : BaseAuditableEntity
{
    public string Base64Data { get; set; }
    public string Format { get; set; }

    public SightReview SightReview { get; set; }
    public Guid SightReviewId { get; set; }
}
