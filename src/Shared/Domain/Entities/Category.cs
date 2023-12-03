namespace Domain.Entities;
public class Category : BaseAuditableEntity
{
    public Category(string name)
    {
        Name = name;
    }

    public Category? Parent { get; set; }
    public Guid? ParentId { get; set; }
    public ICollection<Category> Subcategories { get; set; }

    public string Name { get; set; }
    public ICollection<Sight> Sights { get; set; } = null!;
}
