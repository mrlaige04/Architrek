using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;
public class Location : BaseAuditableEntity
{
    public Sight Sight { get; set; }
    public Guid SightId { get; set; }

    public Country Country { get; set; }
    public Guid CountryId { get; set; }
    public double Longitude { get; set; } 
    public double Latitude { get; set; }

    public Point GisLocation { get; set; }
    public Location()
    {
        GisLocation = new Point(Longitude, Latitude);
    }
}
