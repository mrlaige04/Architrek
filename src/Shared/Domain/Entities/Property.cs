namespace Domain.Entities;
public class Property : BaseAuditableEntity
{
    public string Name { get; set; }
    public PropertyTypes Type { get; set; }

    public ICollection<Category> Categories { get; set; }
}

public enum PropertyTypes
{
    Number,
    String,
    DateTime
}
