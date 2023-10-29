namespace Domain.Entities;
public class PropertyValue : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }
    public Property Property { get; set; }
    public string JsonValue { get; set; }
}
