namespace Domain.Entities;
public class SightReview : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }

    public ICollection<SightReviewPhoto>? Photos { get; set; }

    public DateTime Posted { get; set; }
    public Guid OwnerId { get; set; }

    public string? Reviewer { get; set; }
    public double Rating { get; set; }
    public string? ReviewText { get; set; }
}
