namespace Domain.Entities;
public class Information : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }

    public string Title { get; set; }
    public string Text { get; set; }
}
