namespace Domain.Entities;
public class Review : BaseAuditableEntity
{
    public Guid OwnerId { get; set; }
    public bool IsAnonymous { get; set; } 
    public double Rating { get; set; }
    public string? ReviewText { get; set; }
}
