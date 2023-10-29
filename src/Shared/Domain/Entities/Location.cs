namespace Domain.Entities;
public class Location : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }

    public Country Country { get; set; }
    public Guid CountryId { get; set; }
    public int Longitude { get; set; } 
    public int Latitude { get; set; }
}
