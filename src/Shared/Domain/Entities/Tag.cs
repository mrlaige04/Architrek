namespace Domain.Entities;
public class Tag : BaseAuditableEntity
{
    public string Name { get; set; }
    public string NameNormalized => Name.ToUpperInvariant();

    public ICollection<Sight> Sights { get; set; }
}
