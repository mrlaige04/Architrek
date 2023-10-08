namespace Domain.Entities;
public class Category : BaseAuditableEntity
{
    public string Name { get; set; }

    public ICollection<Sight> Sights { get; set; }
}
