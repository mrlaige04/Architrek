namespace Domain.Entities;
public class Category : BaseAuditableEntity
{
    public Category(string name)
    {
        Name = name;
    }

    public string Name { get; set; }

    public ICollection<Property> Properties { get; set; } = null!;

    public ICollection<Sight> Sights { get; set; } = null!;
}
