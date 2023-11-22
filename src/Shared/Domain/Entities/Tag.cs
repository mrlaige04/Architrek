namespace Domain.Entities;
public class Tag : BaseAuditableEntity
{
    public string Name { get; set; }
    public string NameNormalized => Name.ToUpperInvariant();
    public Tag(string name)
    {
        Name = name;
    }

    public Sight Sight { get; set; }
    public Guid SightId { get; set; }
}
