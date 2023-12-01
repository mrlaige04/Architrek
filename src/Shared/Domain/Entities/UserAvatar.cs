namespace Domain.Entities;
 public class UserAvatar : BaseAuditableEntity
{
    public string? Url { get; set; }
    public Guid UserId { get; set; }
}
