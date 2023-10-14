namespace Domain.Entities;
public class City : BaseAuditableEntity
{
    public string Name { get; set; }

    public Guid CountryId { get; set; }
    public Country Country { get; set; }
    public bool IsCapital { get; set; }
    public Coordinate Coordinate { get; set; }

    public ICollection<Review> Reviews { get; set; }
}
