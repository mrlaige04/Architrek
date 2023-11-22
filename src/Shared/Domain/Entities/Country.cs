namespace Domain.Entities;
public class Country : BaseAuditableEntity
{
    public string Name { get; init; }
    public Country(string name)
    {
        Name = name;
    }
}
