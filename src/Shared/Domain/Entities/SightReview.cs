namespace Domain.Entities;
public class SightReview : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }

    public ICollection<SightReviewPhoto>? Photos { get; set; }

    public Guid OwnerId { get; set; }
    public bool IsAnonymous { get; set; } 
    public double Rating { get; set; }
    public string? ReviewText { get; set; }
}
